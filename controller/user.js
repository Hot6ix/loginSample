var userSchema = require('../models/user');
var tokenManager = require('../tools/tokenManager');

exports.signUp = async (obj, args, context, info) => {
    var msg = {};
    try {
        obj.user.level = 0;
        await new userSchema(obj.user).save();
        msg.msg = 'succeed'
        return msg;
    } catch (err) {
        msg.msg = err.message
    }

    return msg;
}

exports.login = async (obj, args, context, info) => {
    var msg = {};

    // get user data
    var query = userSchema.where({
        uid: obj.id,
        password: obj.password
    });
    try {
        var result = await query.findOne();
        // generate token
        var token = await tokenManager.createToken(result);

        msg.msg = 'succeed'
        msg.nickname = result.nickname;
        msg.token = token
    } catch (err) {
        console.log(err);
        msg.msg = err.message
    }
    
    return msg;
}

exports.getUser = async (obj, args, context, info) => {
    // get user data
    
    var decoded = await tokenManager.verifyToken(obj.token);


    if(decoded) {
        var query = userSchema.where({
            uid: decoded.uid
        });
        var result;
        try {
            result = await query.findOne();
        } catch (err) {
            console.log(err);
        }
    }

    return result;
}

exports.getUsers = async (obj, args, context, info) => {
    // get users
    var result = await tokenManager.verifyToken(obj.token);
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

exports.checkUser = async (obj, args, context, info) => {
    // get user data
    var query = userSchema.where({
        uid: obj.uid
    });
    try {
        var result= await query.findOne();
        if(result) return true;
        else return false;
    } catch (err) {
        return false;
    }
}