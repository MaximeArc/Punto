module.exports = app => {
    const users = require("../controllers/user.controller.js");

    const router = require("express").Router();

    router.post("/", users.create);

    router.get("/", users.findAll);

    router.get("/:id", users.findOne);

    router.put("/:id", users.update);

    router.delete("/:id", users.delete);

    router.delete("/", users.deleteAll);

    router.post("/mail", users.findOneByEmail);

    app.use('/api/users', router);
};