<h1>Simple user board project</h1>

Simple user board web application using several library. To learn graphql and other libraries. This project needs to be take care like if conditions are not met, it won't warn you. 

**Features**
- Login
- CRUD a post (Need login to CUD)

**What used**  
Front-end : Bootstrap 4, jQuery  
Back-end : Node.js, Express.js  
Data fetching : GraphQL, Mongoose  
Authentication : JWT  

This project does not use front-end framework like Vue.js or React.js, but just use Express.js, Bootstrap and jQuery.

**Pre-work**
- MongoDB and Node.js must be installed in your computer.
- MongoDB must be run in your computer.

**How to run**
1. Clone or download project
2. Go to the project directory in command prompt
3. Install dependencies -> "npm install"
4. Run app -> "DEBUG=/:* npm start"
5. Load "localhost:3000" in web browser

You can go to url : <a target="_blank" href="http://localhost:3000/graphql">localhost:3000/graphql</a> to test graphql api

**GraphQL queries and mutations**
- Query
	- getUserInfo(Token): Return user information using token
	- getUsers(Token) : Return user information list (need token to auth and user level must be greater than 0 in DB)
	- getPosts : Return posts
	- getPost(pid): Return single post (need pid)
  
- Mutation
	- signUp(userInfo) : Sign up for new user and return message of singup result
	- login(id, pw): Login using id and pw and return message of login result
	- writePost(postInput, token): Write a post and return message of write result (need token to verify document owner)
	- updatePost(pid, token, postInput): Update a post and return message of write result (need token to verify document owner)
	- deletePost(pid, token): Delete a post and return message of write result (need token to verify document owner)

**Web endpoint**
- /
	- Main page
	- Can CRUD a post
- /login
	- Login and sign up page
- /users
	- Show user information
- /graphql
	- GraphQL page (graphiql is enabled)
	- Use for request data and test
