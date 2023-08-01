const express = require("express");
const app = express();
const port = 3000;
const connection = require("./db/connection");
const Games = require("./controllers/GamesController");
const Users = require("./controllers/UsersController");
const Game = require("./model/Game");
const User = require("./model/User");
const cors = require("cors");

app.use(cors());

connection.authenticate()
    .then(() => {
        console.log("connection made successfully");
    })
    .catch((error) => {
        console.log(error);
    });

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/", Games);
app.use("/", Users);

app.listen(port, () => {
    console.log(`the server is runing in port: ${port}`);
});