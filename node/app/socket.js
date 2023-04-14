const socketIO = require('socket.io');
const { v4: uuidv4 } = require('uuid');
const { playGame } = require("./handFunctions/HandDealing");
const axios = require('axios');

const rooms = []

module.exports = (server) => {
    const io = socketIO(server,{
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
        }
    });

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
                currentPlayerIndex: 0,
                gridId: []
            }
            rooms.push(room);
            if(!!roomId){
                socket.emit('roomId', roomId);
            }
            //emitRoomsList();
        });

        socket.once('join', async (roomId, color, remainingColors, user) => {
            const room = rooms.find(r => r.id === roomId);
            if (room) {

                socket.join(roomId);

                const roomIndex = rooms.findIndex((r) => r.id === roomId);
                rooms[roomIndex].remainingColors = remainingColors;
                const playerIndex = rooms[roomIndex].players.findIndex((p) => p.id === socket.id);

                if (playerIndex === -1) {
                    let hand = []

                    socket.on('cards', async (cards) => {
                        hand = await playGame(cards, room.number, color);
                        await socket.emit('hand', hand)
                        rooms[roomIndex].players.filter((p) => p.id === user.id).map((h) => h.hand.push(hand))
                    })
                    const player = {
                        id: user.id,
                        color: color,
                        name: user.name,
                        hand: hand,
                        roundsWon: 0,
                        played: user.played,
                        victory: user.victory
                    }
                    rooms[roomIndex].players.push(player);
                }


                if (rooms[roomIndex].players.length === room.number) {
                    await io.to(roomId).emit('fetchCards')

                    socket.on('cards', async (cards) => {
                        const hand = await playGame(cards, room.number, color);
                        socket.emit('hand', hand)
                        rooms[roomIndex].players.filter((p) => p.id === user.id).map((h) => h.hand.push(hand))
                    })

                    await io.to(roomId).emit('initialState');
                    const currentPlayer = room.players[room.currentPlayerIndex];
                    io.to(roomId).emit('yourTurn', currentPlayer);
                }
            } else {
                socket.emit('error', 'Room does not exist');
            }
            socket.on('move', async (grid) => {

                const room = rooms.find(r => r.id === roomId);
                if(room.gridId.length===0){
                    const postGrid = async (grid) => {
                        const url = `http://localhost:8080/api/boards`;
                        try {
                            const response = await axios.post(url, { grid:grid });
                            room.gridId.push(response.data._id);
                            return response.data;
                        } catch (error) {
                            console.error(error);
                        }
                    };

                    await postGrid(grid)
                        .then(data => console.log(data))
                        .catch(error => console.error(error));

                }
                if(room.gridId.length>0){
                    const updateGrid = async (id, grid) => {
                        const url = `http://localhost:8080/api/boards/${id}`;
                        try {
                            const response = await axios.put(url, { grid:grid });
                            return response.data;
                        } catch (error) {
                            console.error(error);
                        }
                    };

                    const gridId = room.gridId[0];

                    await updateGrid(gridId,grid)
                        .then(data => console.log(data))
                        .catch(error => console.error(error));
                }


                const newGrid = [...grid];
                await io.to(roomId).emit('gameState', newGrid);
                room.currentPlayerIndex = (room.currentPlayerIndex + 1) % room.players.length;
                const nextPlayer = await room.players[room.currentPlayerIndex];
                await io.to(roomId).emit('yourTurn', nextPlayer);
            })

            socket.on('winRound', async (player) => {
                const room = rooms.find(r => r.id === roomId);
                const playerIndex = room.players.findIndex((p) => p.id === player.id);

                if (playerIndex !== -1) {
                    room.players[playerIndex].roundsWon++;
                    if (room.players[playerIndex].roundsWon === 2) {
                        const scores = room.players.map((p) => ({name: p.name, score: p.roundsWon}));
                        await io.to(roomId).emit('gameWinner', player,scores);
                        await resetGame(room);
                        setTimeout(() => {
                            io.to(roomId).emit('gameOver');
                        }, 5000);
                        const updateUserData = async (userId, played, victory) => {
                            const url = `http://localhost:8080/api/users/${userId}`;
                            const response = await fetch(url, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ played, victory }),
                            });
                            return await response.json();
                        };

                        room.players.map(async (p) => {
                            const userId = p.id;
                            const played = p.played+1;
                            const victory = p.roundsWon === 2 ? p.victory+1 : p.victory;
                            await updateUserData(userId, played, victory)
                                .then(data => console.log(data))
                                .catch(error => console.error(error));
                        }
                        )
                        io.to(roomId).emit('refreshUsers');

                    } else {
                        const scores = room.players.map((p) => ({name: p.name, score: p.roundsWon}));
                        await io.to(roomId).emit('roundWinner', player, scores);
                        resetGame(room); // Reset the game for the next round
                        await io.to(roomId).emit('fetchCards');
                        await io.to(roomId).emit('initialState');
                        const currentPlayer = room.players[room.currentPlayerIndex];
                        io.to(roomId).emit('yourTurn', currentPlayer);
                    }
                }

            });

            const  resetGame = (room) => {
                for (const player of room.players) {
                    player.hand = [];
                }
            }
    });
    });
}
