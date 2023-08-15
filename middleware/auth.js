const jwt = require("jsonwebtoken");

const jwtToken = 'jasjfkashfjasbfnsjfadskfhsfjasklfjakfjakjafjalskf';

function auth(req, res, next) {
    const authToken = req.headers['authorization'];

    if(!authToken) {
        res.status(401).json({error: "Invalid Token"});
    } else {
        const bearer = authToken.split(' ');
        const token = bearer[1];
        jwt.verify(token, jwtToken, (error, data) => {
            if (error) {
                res.status(401).json({error: "Invalid Token"});
            } else {
                req.token = token;
                req.loggedUser = {id: data.id, email: data.email};
                next();
            };
        });
    };
};

module.exports = auth;