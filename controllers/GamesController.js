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
    const name = req.body.name;
    const age = req.body.age;
    const price = req.body.price;

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

router.delete("/games/:id", (req, res) => {
    const id = req.params.id;

    Game.destroy({
        where: {id: id}
    })
    .then(() => {
        res.statusCode = 200;
        res.send("game deleted!");
    })
    .catch((error) => {
        res.statusCode = 404;
        res.send(error);
    });
});

module.exports = router;