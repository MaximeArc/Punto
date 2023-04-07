const db = require("../models");
const Hand = db.hands

exports.create = (req, res) => {

    const hand = new Hand({
        hand:req.body.hand
    });

    hand
        .save(hand)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Hand."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Hand.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Hand with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Hand with id=" + id });
        });
};
