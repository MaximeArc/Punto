const express = require("express");
const cors = require("cors");
const app = express();
const http = require('http');
const socketIO = require('socket.io');
const db = require("./app/models");
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const {playGame} = require("./app/HandFunctions/HandDealing");


const corsOptions = {
    origin: ["http://localhost:3000","http://localhost:8080"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);

const io = socketIO(server,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const rooms = []
io.on('connection', async (socket) => {

    const emitRoomsList = () => {
        io.emit('roomsList', rooms);
    }

    socket.on('getRooms', () => {
        emitRoomsList();
    });

    socket.on('createRoom', (roomName, roomNumber) => {
        const roomId = uuidv4();
        const room = {
            id: roomId,
            name: roomName,
            number:roomNumber,
            players: [],
            remainingColors: ["Blue", "Red", "Green", "Yellow"],
        }
        rooms.push(room);
        if(!!roomId){
            socket.emit('roomId', roomId);
        }
        //emitRoomsList();
    });

    socket.once('join', (roomId, color, remainingColors) => {
        //const room = io.sockets.adapter.rooms.get(roomId);
        const room = rooms.find(r => r.id === roomId);
        console.log('room', room)
        if (room) {
            socket.join(roomId);
            const roomIndex = rooms.findIndex((r) => r.id === roomId);
            rooms[roomIndex].remainingColors = remainingColors;
            const playerIndex = rooms[roomIndex].players.findIndex((p) => p.id === socket.id);
            if (playerIndex === -1) {
                let hand = []
                socket.on('cards', (cards) => {
                    hand = playGame(cards, room.number, color);
                    socket.emit('hand', hand)
                })
                const player = {
                    id: socket.id,
                    color: color,
                    name: 'Player 2',
                    hand: hand
                }
                console.log('player', player)
                rooms[roomIndex].players.push(player);
            }
            socket.emit('fetchCards')
            socket.on('cards', async (cards) => {
                const hand = await playGame(cards, room.number,);
                await console.log('hand', hand)
                socket.emit('hand', hand)
            })
            io.to(roomId).emit('initialState');
        } else {
            socket.emit('error', 'Room does not exist');
        }
        socket.on('move', (grid) => {
            const newGrid = [...grid];
            io.to(roomId).emit('gameState', newGrid);
        })
    });
});


const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

db.mongoose
  .connect(db.url, {
 /*   auth: {
      username: "max",
      password: "mvmmvm",
    },
    authSource: "admin",*/
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

require("./app/routes/card.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/board.routes")(app);
require("./app/routes/hand.routes")(app);
require("./app/routes/game.routes")(app);






