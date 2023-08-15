const express = require("express");
const router = express.Router();
const Game = require("../model/Game");
const auth = require("../middlewars/auth"); 

router.get("/games", auth, (req, res) => {
    let HATEOAS = [
        {
            href: "http://localhost:3000/games",
            method: "POST",
            rel: "create_game"
        },
        {
            href:"http://localhost:3000/auth",
            method: "POST",
            rel: "login"
        }
    ];

    Game.findAll()
        .then((games) => {
            res.status(200).send({games: games, _links: HATEOAS});
        })
        .catch((error) => {
            res.status(404).send(error);
        });
});

router.get("/games/:id", auth, (req, res) => {
    const id = req.params.id;
    
    let HATEOAS = [
        {
            href: "http://localhost:3000/games/" + id,
            method: "GET",
            rel: "get_game"
        },
        {
            href: "http://localhost:3000/games",
            method: "GET",
            rel: "get_all_games"
        },
        {
            href: "http://localhost:3000/games/" + id,
            method: "DELETE",
            rel: "delete_game"
        },
        {
            href: "http://localhost:3000/games",
            method: "POST",
            rel: "create_game"
        },
        {
            href: "http://localhost:3000/games/" + id,
            method: "PUT",
            rel: "update_game"
        }
    ];

    if (isNaN(id) || id < 1) {
        res.sendStatus(400);
    } else {
        Game.findOne({ where: { id: id } })
            .then((game) => {
                if (game != undefined) {
                    res.status(200).json({game: game, _links: HATEOAS});
                } else {
                    res.sendStatus(404);
                };
            })
            .catch((error) => {
                res.send(error);
            });
    };
});

router.post("/games", auth, (req, res) => {
    const { name, age, price } = req.body;

    let HATEOAS = [
        {
            href: "http://localhost:300/games",
            method: "POST",
            rel: "create_game"
        }
    ];

    if (!name || !age || isNaN(age) || price < 0 || price == undefined || price == null || isNaN(price)) {
        res.sendStatus(400);
    } else {
        Game.create({
            name: name,
            age: age,
            price: price
        })
            .then(() => {
                res.status(200).json({message: "game created!", _links: HATEOAS});
            })
            .catch((error) => {
                res.status(200).send(error);
            });
    };
});

router.put("/games/:id", auth, (req, res) => {
    const id = parseInt(req.params.id);

    let HATEOAS = [
        {
            href: "http://localhost:3000/games/" + id,
            method: "GET",
            rel: "get_game"
        },
        {
            href: "http://localhost:3000/games",
            method: "GET",
            rel: "get_all_games"
        },
        {
            href: "http://localhost:3000/games/" + id,
            method: "DELETE",
            rel: "delete_game"
        },
        {
            href: "http://localhost:3000/games",
            method: "POST",
            rel: "create_game"
        },
        {
            href: "http://localhost:3000/games/" + id,
            method: "PUT",
            rel: "update_game"
        }
    ];

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
                res.status(200).json({message:"game updated!", _links: HATEOAS});
            })
            .catch(() => {
                res.status(400).send("error updating game");
            });
    }
});


router.delete("/games/:id", auth, (req, res) => {
    const id = parseInt(req.params.id);

    let HATEOAS = [
        {
            href: "http://localhost:3000/games/" + id,
            method: "GET",
            rel: "get_game"
        },
        {
            href: "http://localhost:3000/games",
            method: "GET",
            rel: "get_all_games"
        },
        {
            href: "http://localhost:3000/games/" + id,
            method: "DELETE",
            rel: "delete_game"
        },
        {
            href: "http://localhost:3000/games",
            method: "POST",
            rel: "create_game"
        },
        {
            href: "http://localhost:3000/games/" + id,
            method: "PUT",
            rel: "update_game"
        }
    ];

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
                            res.status(200).json({message: "game deleted!", _links: HATEOAS});
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