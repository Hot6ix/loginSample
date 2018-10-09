<h1>Simple user board project</h1>

This project does not use front-end framework like Vue.js or React.js, but just use Express.js, Bootstrap and jQuery.

Front-end : Bootstrap 4, jQuery
</br>Back-end : Node.js, Express.js
</br>Data fetching : GraphQL, Mongoose
</br>Authentication : JWT

Pre-work
- MongoDB and Node.js must be installed in your computer.
- MongoDB must be run in your computer.

How to run
1. Clone or download project
2. Go to the project directory in command prompt
3. Install dependencies -> "npm install"
4. Run app -> "DEBUG=/:* npm start"
5. Load "localhost:3000" in web browser

You can go to url : <a target="_blank" href="http://localhost:3000/graphql">localhost:3000/graphql</a> to test graphql api

<h4>GraphQL endpoint</h4>
- Query
	- getUsers(Token) : Return user information list (need token to auth and user level must be greater than 0 in DB)
	- getPosts : Return posts
	- getPost(pid): Return single post (need pid)
  
- Mutation
	- signUp(userInfo) : Sign up for new user and return message of singup result
	- login(id, pw): Login using id and pw and return message of login result
	- writePost(postInput, token): Write a post and return message of write result (need token to verify document owner)
	- updatePost(pid, token, postInput): Update a post and return message of write result (need token to verify document owner)
	- deletePost(pid, token): Delete a post and return message of write result (need token to verify document owner)

<h4>Web endpoint</h4>
- /</br>
	- Main page</br>
	- Can CRUD a post</br>
- /login</br>
	- Login and sign up page</br>
- /graphql</br>
	- GraphQL page (graphiql is enabled)</br>
	- Use for request data and test</br>
