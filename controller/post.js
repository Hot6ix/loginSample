var postSchema = require('../models/post');
var tokenManager = require('../tools/tokenManager');
var userController = require('../controller/user');

exports.write = async (data) => {
    var msg = {};

    // verify token
    var token = data.token;
    var decoded = await tokenManager.verifyToken(token);
    
    if(decoded) {
        // chekc if user exist
        var isExist = await userController.checkUser(decoded);
        console.log(isExist);
        if(isExist) {
            try {
                data.post.uid = decoded.uid;
                var result = await new postSchema(data.post).save();
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

exports.list = async () => {
    return await postSchema.find();
}