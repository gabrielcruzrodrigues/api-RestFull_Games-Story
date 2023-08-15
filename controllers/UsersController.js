const express = require("express");
const router = express.Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const JWTsecret = "jasjfkashfjasbfnsjfadskfhsfjasklfjakfjakjafjalskf";
const auth = require("../middlewars/auth"); 

router.get("/users", auth, (req, res) => {
    let HATEOAS = [
        {
            href: "http://localhost:3000/users",
            method: "GET",
            rel: "get_all_users"
        },
        {
            href: "http://localhost:3000/users",
            method: "POST",
            rel: "create_user"
        },
        {
            href: "http://localhost3000/auth",
            method: "POST",
            rel: "login"
        }
    ];

    User.findAll()
        .then((users) => {
            res.status(200).json({users: users, _links: HATEOAS});
        }).catch((error) => {
            res.status(404).send(error);
        })
})

router.get("/users/:id", auth, (req, res) => {
    let id = parseInt(req.params.id);

    let HATEOAS = [
        {
            href: "http://localhost:3000/users",
            method: "GET",
            rel: "get_all_users"
        },
        {
            href: "http://localhost:3000/users/" + id,
            method: "GET",
            rel: "get_user"
        },
        {
            href: "http://localhost:3000/users",
            method: "POST",
            rel: "create_user"
        },
        {
            href: "http://localhost:3000/users/" + id,
            method: "PUT",
            rel: "update_user"
        },
        {
            href: "http://localhost:3000/users/" + id,
            method: "DELETE",
            rel: "delete_user"
        }
    ];

    if (isNaN(id) || id < 1) {
        res.sendStatus(400);
    } else {
        User.findOne({ where: { id: id } })
            .then((user) => {
                if (!user) {
                    res.status(404).json({error: "user not found."});
                } else {
                    res.status(200).json({user: user, _links: HATEOAS});
                }
            }).catch((error) => {
                res.status(400).json(error);
            })
    };
});

router.post("/users", (req, res) => {
    let { name, email, password } = req.body;

    let HATEOAS = [
        {
            href: "http://localhost:3000/users",
            method: "GET",
            rel: "get_all_users"
        },
        {
            href: "http://localhost:3000/users",
            method: "POST",
            rel: "create_user"
        },
        {
            href: "http://localhost:3000/auth",
            method: "POST",
            rel: "login"
        }
    ];

    if (!name || !email || !password) {
        res.sendStatus(404);
    } else {
        User.create({
            name: name,
            email: email,
            password: password
        })
        .then(() => {
            res.status(200).json({message: "user created!", _links: HATEOAS});
        }).catch((error) => {
            res.status(400).json(error);
        });
    };
});

router.delete("/users/:id", auth, (req, res) => {
    let id = parseInt(req.params.id);

    let HATEOAS = [
        {
            href: "http://localhost:3000/users",
            method: "GET",
            rel: "get_all_users"
        },
        {
            href: "http://localhost:3000/users",
            method: "POST",
            rel: "create_user"
        },
    ];

    if (isNaN(id) || id < 1) {
        res.sendStatus(400);
    } else {
        User.destroy({where: {id: id}})
            .then((response) => {
                if (!response) {
                    res.sendStatus(404).json({error: "user not found!"});
                } else {
                    res.status(200).json({message: "user Deleted!", _links: HATEOAS});
                };
            }).catch((error) => {
                res.sendStatus(404).send(error);
            });
    };
});

router.post("/auth", (req, res) => {
    let {email, password} = req.body;

    let HATEOAS = [
        {
            href: "http://localhost:3000/users",
            method: "GET",
            rel: "get_all_users"
        },
        {
            href: "http://localhost:3000/users",
            method: "POST",
            rel: "create_user"
        },
    ];

    if (!email || !password) {
        res.status(401).json({error: "incorrect credentials"});
    } else {
        User.findOne({where: {email: email}})
            .then((user) => {
                if (!user) {
                    res.status(404).json({error: "email is not found."});
                } else {
                    if (user.password == password) {

                        jwt.sign({id: user.id, email: user.email}, JWTsecret, {expiresIn: '48h'}, (error, token) => {//payload
                            if (error) {
                                res.status(400).json({error: "failed to create token"});
                            } else {
                                res.status(200).json({token: token, _links: HATEOAS});
                            };
                        }); 
                    } else {
                        res.status(401).json({error: "incorrect credentials"});
                    };
                };
            })
            .catch((error) => {
                res.status(400).json(error);
            });
    };
});

module.exports = router;