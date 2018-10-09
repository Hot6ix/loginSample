var postSchema = require('../models/post');
var tokenManager = require('../tools/tokenManager');
var userController = require('../controller/user');

exports.write = async (obj, args, context, info) => {
    var msg = {};

    // verify token
    var token = obj.token;
    var decoded = await tokenManager.verifyToken(token);
    
    if(decoded) {
        // chekc if user exist
        var isExist = await userController.checkUser(decoded);
        if(isExist) {
            try {
                obj.post.uid = decoded.uid;
                obj.post.createdAt = new Date().getTime();
                var result = await new postSchema(obj.post).save();
                if(result) msg.msg = 'succeed'
                else msg.msg ='failed'
            } catch (err) {
                console.log(err);
                msg.msg = 'failed'
            }
        }
        else {
            msg.msg = 'user not exist'
        }
    }
    else {
        // failed to verify
        msg.msg = 'token is invalid';
    }

    return msg;
}

exports.delete = async (obj, args, context, info) => {
    var msg = {};

    // verify token
    var id = obj.pid;
    var token = obj.token;
    var decoded = await tokenManager.verifyToken(token);

    if(decoded) {
        try {
            var result = await postSchema.deleteOne({_id: id, uid: decoded.uid}).exec();
            if(result != null && result.n > 0) msg.msg = 'succeed'
            else msg.msg ='failed'
        } catch (err) {
            console.log(err);
            msg.msg = 'failed'
        }
    }
    else {
        // failed to verify
        msg.msg = 'token is invalid';
    }

    return msg;
}

exports.list = async () => {
    return await postSchema.find();
}