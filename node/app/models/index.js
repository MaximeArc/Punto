const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.cards = require("./card.model.js")(mongoose);
db.users = require("./user.model.js")(mongoose);
db.boards = require("./board.model.js")(mongoose);
db.hands = require("./hand.model.js")(mongoose);
db.games = require("./game.model.js")(mongoose);

module.exports = db;

