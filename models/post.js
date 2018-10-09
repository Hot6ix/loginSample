var mongoose = require('mongoose');

var post = new mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('post', post, 'post');