const db = require("../models");
const Card = db.cards

exports.create = (req, res) => {
    if (!req.body.value) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    const card = new Card({
        value: req.body.value,
        color: req.body.color,
    });
  
    card
      .save(card)
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

exports.insertMany = (req, res) => {
    const cards = req.body.map(card => ({
        value: card.value,
        color: card.color,
    }));

    Card.insertMany(cards)
        .then(data => {
            res.send({ message: `${data.length} cards inserted` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Cards."
            });
        });
};


exports.findAll = (req, res) => {
    const value = req.query.value;
    var condition = value ? { value: { $regex: new RegExp(value), $options: "i" } } : {};
  
    Card.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving cards."
        });
      });
  };

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Card.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Card with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Card with id=" + id });
      });
  };
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Card.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Card with id=${id}. Maybe Card was not found!`
          });
        } else res.send({ message: "Card was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Card with id=" + id
        });
      });
  };

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Card.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Card with id=${id}. Maybe Card was not found!`
          });
        } else {
          res.send({
            message: "Card was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Card with id=" + id
        });
      });
  };

exports.deleteAll = (req, res) => {
    Card.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Cards were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all cards."
        });
      });
  };

