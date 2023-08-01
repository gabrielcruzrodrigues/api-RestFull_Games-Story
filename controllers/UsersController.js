const express = require("express");
const router = express.Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const JWTsecret = "jasjfkashfjasbfnsjfadskfhsfjasklfjakfjakjafjalskf";
const auth = require("../middlewars/auth"); 

router.get("/users", auth, (req, res) => {
    User.findAll()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((error) => {
            res.status(404).send(error);
        })
})

router.get("/users/:id", auth, (req, res) => {
    let id = parseInt(req.params.id);

    if (isNaN(id) || id < 1) {
        res.sendStatus(400);
    } else {
        User.findOne({ where: { id: id } })
            .then((user) => {
                if (!user) {
                    res.sendStatus(404);
                } else {
                    res.json(user);
                }
            })
            .catch((error) => {
                res.status(400).json(error);
            })
    };
});

router.post("/users", auth, (req, res) => {
    let { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.sendStatus(404);
    } else {
        User.create({
            name: name,
            email: email,
            password: password
        })
        .then(() => {
            res.statusCode = 200;
            res.send("users created");
        })
        .catch((error) => {
            res.status(400).json(error);
        });
    };
});

router.delete("/users/:id", auth, (req, res) => {
    let id = parseInt(req.params.id);

    if (isNaN(id) || id < 1) {
        res.sendStatus(400);
    } else {
        User.destroy({where: {id: id}})
            .then((response) => {
                if (response != undefined) {
                    res.status(200).send("user Deleted!");
                } else {
                    res.sendStatus(404).send("user not found!");
                };
            })
            .catch((error) => {
                res.sendStatus(404).send(error);
            });
    };
});

router.post("/auth", (req, res) => {
    let {email, password} = req.body;
    console.log("passou");

    if (!email || !password) {
        res.status(400).json({res: "Os dados enviados são inválidos"});
    } else {
        User.findOne({where: {email: email}})
            .then((user) => {
                if (!user) {
                    res.status(404).json({error: "O email enviado não existe na base de dados!"});
                } else {
                    if (user.password == password) {

                        jwt.sign({id: user.id, email: user.email}, JWTsecret, {expiresIn: '48h'}, (error, token) => {//payload
                            if (error) {
                                res.status(400).json({error: "Falha interna"});
                            } else {
                                res.status(200).json({token: token});
                            };
                        }); 

                    } else {
                        res.status(401).json({error: "credenciais inválidas"});
                    };
                };
            })
            .catch((error) => {
                res.sendStatus(404);
            });
    };
});

module.exports = router;