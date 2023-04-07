module.exports = app => {
    const hands = require("../controllers/hand.controller.js");

    const router = require("express").Router();

    router.post("/", hands.create);

/*
    router.get("/", hands.findAll);
*/

    router.get("/:id", hands.findOne);

/*
    router.put("/:id", hands.update);
*/

/*
    router.delete("/:id", hands.delete);
*/

/*
    router.delete("/", hands.deleteAll);
*/

    app.use('/api/hands', router);
};