module.exports = app => {
    const cards = require("../controllers/card.controller.js");

    const router = require("express").Router();

    router.post("/", cards.create);

    router.post("/insertArray/", cards.insertMany);
  
    router.get("/", cards.findAll);
  
    router.get("/:id", cards.findOne);
  
    router.put("/:id", cards.update);
  
    router.delete("/:id", cards.delete);
  
    router.delete("/", cards.deleteAll);
  
    app.use('/api/cards', router);
  };