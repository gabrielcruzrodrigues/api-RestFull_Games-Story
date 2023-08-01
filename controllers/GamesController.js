const express = require("express");
const router = express.Router();
const Game = require("../model/Game");
const auth = require("../middlewars/auth"); 

router.get("/games", auth, (req, res) => {
    Game.findAll()
        .then((games) => {
            res.status(200).send(games);
        })
        .catch((error) => {
            res.status(404).send(error);
        });
});

router.get("/games/:id", auth, (req, res) => {
    const id = req.params.id;

    if (isNaN(id) || id < 1) {
        res.sendStatus(400);
    } else {
        Game.findOne({ where: { id: id } })
            .then((game) => {
                if (game != undefined) {
                    res.status(200).json(game);
                } else {
                    res.sendStatus(404);
                };
            })
            .catch((error) => {
                res.send(error);
            });
    }

});

router.post("/games", auth, (req, res) => {
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
                res.status(200).send("game created!");
            })
            .catch((error) => {
                res.status(200).send(error);
            });
    }
});

router.put("/games/:id", auth, (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id) || id < 1) {
        res.sendStatus(400);
    } else {
        Game.findOne({ where: { id: id } })
            .then((game) => {
                if (!game) {
                    res.sendStatus(404);
                } else {
                    const { name, age, price } = req.body;

                    if (name != undefined) {
                        Game.update({ name: name }, { where: { id: id } })
                    };

                    if (age != undefined) {
                        Game.update({ age: age }, { where: { id: id } })
                    };

                    if (price != undefined) {
                        Game.update({ price: price }, { where: { id: id } })
                    };
                };
                res.status(200).send("game updated!");
            })
            .catch(() => {
                res.status(400).send("error updating game");
            });
    }
});


router.delete("/games/:id", auth, (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id) || id < 1) {
        res.sendStatus(400);
    } else {
        Game.findOne({ where: { id: id } })
            .then((game) => {
                if (!game) {
                    res.sendStatus(404);
                } else {
                    Game.destroy({
                        where: { id: id }
                    })
                        .then(() => {
                            res.status(200).send("game deleted!");
                        })
                        .catch((error) => {
                            res.status(400).send(error);
                        });
                };
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    };
});

module.exports = router;