module.exports = app => {
    const games = require("../controllers/game.controller.js");

    const router = require("express").Router();

    router.post("/", games.create);


    router.get("/", games.findAll);


    router.get("/:id", games.findOne);

    //router.put("/:id", games.update);

/*
    router.delete("/:id", games.delete);
*/

/*
    router.delete("/", games.deleteAll);
*/

    app.use('/api/games', router);
};