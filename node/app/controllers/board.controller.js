const db = require("../models");
const Board = db.boards

exports.create = (req, res) => {

    const board = new Board({
        grid: req.body.grid,
    });

    board
        .save(board)
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

exports.findOne = (req, res) => {
    const id = req.params.id;

    Board.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Board with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Board with id=" + id });
        });
};

exports.findOriginal = (req, res) => {
    const id = "63d3d9fbbc5e22a9a847f160";

    Board.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Board with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Board with id=" + id });
        });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Board.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Board with id=${id}. Maybe Board was not found!`
                });
            } else res.send({ message: "Board was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Board with id=" + id
            });
        });
};
