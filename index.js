const express = require("express");
const app = express();
const port = 3000;
const Games = require("./controllers/GamesController");
const connection = require("./db/connection");
const Game = require("./model/Game");

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

app.listen(port, () => {
    console.log(`the server is runing in port: ${port}`);
});