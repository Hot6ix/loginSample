var jwt = require('jsonwebtoken');

var secret = 'loginSample'
var tokens = [];

exports.createToken = async (user) => {
    var payload = {
        uid: user.uid,
        level: user.level
    }
    var options = {
        expiresIn: "1d"
    }
    var token = await jwt.sign(payload, secret, options);
    tokens.push(token);

    return token;
}

exports.verifyToken = async (token) => {
    var result;
    try {
        result = await jwt.verify(token, secret);
    } catch (err) {
        throw err;
    }
    return result;
}