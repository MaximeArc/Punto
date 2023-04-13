const db = require("../models");
const Game = db.games
const Board = db.boards
const Hand = db.hands


exports.create = async (req, res) => {

    const board = new Board({
        grid: req.body.board.grid,
    })
    const savedBoard = await board.save();

    const hands = req.body.hands.map(hand => {
        return new Hand({
            hand: hand.hand,
            user: hand.user
        })
    })

    const savedHands = await hands.map(hand => {
        return hand.save()
    })

    const game = new Game({
        board: savedBoard._id,
        users: req.body.users.map(user => user._id),
        hands: savedHands.map(hand => hand._id),
        turn: req.body.turn,
        score: req.body.score
    });

    game
        .save(game)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Game."
            });
        });
};

exports.findAll = (req, res) => {
    const value = req.query.value;
    var condition = value ? { value: { $regex: new RegExp(value), $options: "i" } } : {};

    Game.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving games."
            });
        });
};


exports.findOne = (req, res) => {
    const id = req.params.userId;

    Game.find({
        users: { $in: [id] }
    })
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Game with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Game with id=" + id });
        });
};
