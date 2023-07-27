const express = require("express");
const router = express.Router();
const Game = require("../model/Game");

router.get("/games", (req, res) => {
    Game.findAll()
        .then((games) => {
            res.statusCode = 200;
            res.send(games);
        })
        .catch((error) => {
            res.statusCode = 404;
            res.send(error);
        });
});

router.get("/games/:id", (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        res.sendStatus(400);
    } else {

        Game.findOne({
            where: {
                id: id
            }
        })
            .then((game) => {
                if (game != undefined) {
                    res.statusCode = 200;
                    res.json(game);
                } else {
                    res.sendStatus(404);
                }

            })
            .catch((error) => {
                res.send(error);
            });
    }

});

router.post("/games", (req, res) => {
    const { name, age, price } = req.body;

    if (!name || !age || isNaN(age) || price < 0 || price == undefined || price == null || isNaN(price)) {
        res.sendStatus(400);
    } else {
        Game.create({
            name: name,
            age: age,
            price: price
        })
            .then(() => {
                res.statusCode = 200;
                res.send("game created!");
            })
            .catch((error) => {
                res.statusCode = 404;
                res.send(error);
            });
    }
});

router.put("/games/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        res.sendStatus(400);
    } else {
        if (id < 1) {
            res.sendStatus(400);
        } else {
            console.log('passou');
            Game.findOne({ where: { id: id } })
                .then((game) => {
                    if (!game) {
                        res.sendStatus(404);
                    } else {
                        const { name, age, price } = req.body;

                        if (name != undefined) {
                            Game.update({ name: name }, { where: { id: id } })
                                .then(() => {
                                    res.statusCode = 200;
                                    res.send("game updated!");
                                })
                                .catch(() => {
                                    // res.sendStatus(400);
                                });
                        };

                        if (age != undefined) {
                            Game.update({ age: age }, { where: { id: id } })
                                .then(() => {
                                    res.statusCode = 200;
                                    res.send("game updated!");
                                })
                                .catch(() => {
                                    // res.sendStatus(400);
                                });
                        };

                        if (price != undefined) {
                            Game.update({ price: price }, { where: { id: id } })
                                .then(() => {
                                    res.statusCode = 200;
                                    res.send("game updated!");
                                })
                                .catch(() => {
                                    // res.sendStatus(400);
                                });
                        };
                    };
                })
                .catch(() => {
                    res.sendStatus(400);
                });
        };
    };
})

router.delete("/games/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        const id = parseInt(req.params.id);

        if (id < 1) {
            res.sendStatus(400);
        } else {
            Game.findOne({
                where: { id: id }
            })
                .then((game) => {
                    if (!game) {
                        res.sendStatus(404);
                    } else {
                        Game.destroy({
                            where: { id: id }
                        })
                            .then(() => {
                                res.statusCode = 200;
                                res.send("game deleted!");
                            })
                            .catch((error) => {
                                res.statusCode = 400;
                                res.send(error);
                            });
                    };
                })
                .catch((error) => {
                    res.sendStatus(400);
                });
        };
    };
});

module.exports = router;