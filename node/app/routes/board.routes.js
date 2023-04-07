const cards = require("../controllers/card.controller");
module.exports = app => {
    const boards = require("../controllers/board.controller.js");

    const router = require("express").Router();

    router.post("/", boards.create);

/*
    router.get("/", boards.findAll);
*/

    router.get("/:id", boards.findOne);

    router.get("/", boards.findOriginal);

    router.put("/:id", boards.update);




    /*
        router.put("/:id", boards.update);
    */

/*
    router.delete("/:id", boards.delete);
*/

/*
    router.delete("/", boards.deleteAll);
*/

    app.use('/api/boards', router);
};