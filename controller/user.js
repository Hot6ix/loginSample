var userSchema = require('../models/user');
var tokenManager = require('../tools/tokenManager');

exports.signUp = async (user) => {
    var msg = {};
    try {
        user.user.level = 0;
        await new userSchema(user.user).save();
        msg.msg = 'succeed'
        return msg;
    } catch (err) {
        msg.msg = err.message
    }

    return msg;
}

exports.login = async (user) => {
    var msg = {};

    // get user data
    var query = userSchema.where({
        uid: user.id,
        password: user.password
    });
    try {
        var result = await query.findOne();
        // generate token
        var token = await tokenManager.createToken(result);

        msg.msg = 'succeed'
        msg.token = token
    } catch (err) {
        console.log(err);
        msg.msg = err.message
    }
    
    return msg;
}

exports.getUsers = async (token) => {
    // get users
    var result = await tokenManager.verifyToken(token.token);
    if(result) {
        if(result.level > 0) {
            return await userSchema.find();
        }
        else {
            throw new Error('Unauthorized');
        }
    }
    else { throw new Error('Unknown') };
}

exports.checkUser = async (user) => {
    // get user data
    console.log(user);
    var query = userSchema.where({
        uid: user.uid
    });
    try {
        var result= await query.findOne();
        if(result) return true;
        else return false;
    } catch (err) {
        return false;
    }
}