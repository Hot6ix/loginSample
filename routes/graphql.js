var express = require('express');
var router = express.Router();
var graphqlHTTP = require('express-graphql');
var { buildSchema, GraphQLObjectType, GraphQLSchema } = require('graphql');
var graphql = require('graphql');
var userController = require('../controller/user');
var postController = require('../controller/post');

var schema = buildSchema(`

    interface Result {
        msg: String
    }

    input UserInfo {
        uid: String
        password: String
        nickname: String
    }

    input PostInput {
        title: String
        content: String
    }

    type User {
        uid: String
        nickname: String
    }

    type SingUpResult implements Result {
        msg: String
    }

    type LoginResult implements Result {
        msg: String
        nickname: String
        token: String
    }

    type WriteResult implements Result {
        msg: String
    }

    type Post {
        id: ID
        uid: String
        title: String
        content: String
        createdAt: Float
    }
    
    type Query {
        getUserInfo(token: String): User
        getUsers(token: String): [User]
        getPosts: [Post]
    }

    type Mutation {
        signUp(user: UserInfo): SingUpResult
        login(id: String, password: String): LoginResult
        writePost(post: PostInput, token: String): WriteResult
        deletePost(pid: ID, token: String): WriteResult
    }
`);

var root = {
    signUp: userController.signUp,
    login: userController.login,
    getUsers: userController.getUsers,
    writePost: postController.write,
    deletePost: postController.delete,
    getPosts: postController.list
};

router.use('/', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
    formatError: (err) => { return { message: err.message } }
}));

module.exports = router;