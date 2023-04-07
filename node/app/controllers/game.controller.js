const db = require("../models");
const Game = db.games

exports.create = (req, res) => {


    const game = new Game({
        board: req.body.board,
        data1: {
            user: req.body.data1.user,
            hand: req.body.data1.hand
        },
        data2: {
            user: req.body.data2.user,
            hand: req.body.data2.hand
        },
        data3: {
            user: req.body.user,
            hand: req.body.hand
        },
        data4: {
            user: req.body.user,
            hand: req.body.hand
        },
        turn: req.body.turn

    });

    game
        .save(game)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Card."
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
    const id = req.params.id;

    Game.findById(id)
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
