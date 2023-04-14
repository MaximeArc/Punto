const express = require("express");
const cors = require("cors");
const app = express();
const http = require('http');
const socketIO = require('socket.io');
const db = require("./app/models");
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const {playGame} = require("./app/handFunctions/HandDealing");
const socket = require('./app/socket');


const corsOptions = {
    origin: ["http://localhost:3000","http://localhost:8080"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);
socket(server);


const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

db.mongoose
  .connect(db.url, {
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






