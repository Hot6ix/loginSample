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
        id: ID
        uid: String
        nickname: String
        level: Int
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
        getPost(id: ID!): Post
    }

    type Mutation {
        signUp(user: UserInfo): SingUpResult
        login(id: String, password: String): LoginResult
        writePost(post: PostInput, token: String!): WriteResult
        deletePost(pid: ID, token: String!): WriteResult
        updatePost(pid: ID, token: String!, post: PostInput): WriteResult
    }
`);

var root = {
    signUp: userController.signUp,
    login: userController.login,
    getUserInfo: userController.getUser,
    getUsers: userController.getUsers,
    writePost: postController.write,
    updatePost: postController.update,
    deletePost: postController.delete,
    getPosts: postController.list,
    getPost: postController.single
};

router.use('/', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
    formatError: (err) => { return { message: err.message } }
}));

module.exports = router;