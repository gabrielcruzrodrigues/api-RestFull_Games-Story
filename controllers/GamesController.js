const express = require("express");
const router = express.Router();
const Game = require("../model/Game");

router.get("/games", (req, res) => {
    Game.findAll()
        .then((games) => {
            res.send(games);
        })
        .catch((error) => {
            res.send(error);
        });
});

router.get("/games/:id", (req, res) => {
    const id = req.params.id;

    Game.findOne({
        where: {
            id: id
        }
    })
    .then((game) => {
        res.json(game);
    })
    .catch((error) => {
        res.send("error findbyid");
    });
});

router.post("/games", (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const price = req.body.price;

    Game.create({
        name: name,
        age: age,
        price: price
    })
    .then(() => {
        res.send("game created!");
    })
    .catch((error) => {
        res.send(error);
    });
});

// router.put("/games", (req, res) => {
//     const id = req.body.id;
//     const name = req.body.name;
//     const age = req.body.age;
//     const price = req.body.price;

//     Game.update(
//         {name: name, age: age, price: price},
//         {where: {id: id}}
//     )
//     .then(() => {
//         res.send("updated sucesfull!");
//     })
//     .catch((error) => {
//         res.send(error);
//     });
//     res.send("oi");
// });

module.exports = router;