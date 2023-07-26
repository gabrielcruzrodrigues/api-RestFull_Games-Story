const Sequelize = require("sequelize");
const connection = require("../db/connection");

const Game = connection.define('games', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
});

Game.sync({force: false});

module.exports = Game;  