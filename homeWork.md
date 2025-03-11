-create a repositary
-initilize repositary
-node_modules , package.json, package-lock.json
-Install express
-create a server
-Listen to Port
-write request handlers for /test, /hello
-Install nodemon and update script inside the package.json
-what are dependencies
-what is the use of '-g' while npm install
-Difference between caret and tilde (^ vs ~)

-validate data in signUp api
-install bcrypt package
-create a passwordHash using bcrypt.hash and save the user in encrypted password

-install cookie-parser
-just send dummy cookie to user
-create a Get /profile api and check if you get cookie back
-install jsonwebtoken
-In login API after email and password validation create a jwt token and send it to user in cookie
-read the cookies inside your profile API and find the logged in user
-userAuthmiddlewere
-add the userAuth middlewere in profile api and a new sendConnection request api
-set the expiry of jwt token and cookies to 7days

-explore tinder apis
-create a list of all apis you think of in dev Tinder
-group multiple routes under repeatly routes
-read documentation for express.router
-create a route folder for managing routers like auth,profile, request router
-create profileRouter, authRouter , requestRouter
-import this Router in app.js

-create connectionRequestSchema
-send connection request API
-proper validation of data
-Think about all corner cases
-$or query $and query in mongoose and more logical querys
-Schema.pre("save") function
-Always think About corner cases to make your database more efficiet

-read more about indexes in mongodb
-why do you need indexes in db
-advantage and disadvantage

-read about compond index

-Write code for proper valiations for POST /request/review/:status/:requestId

- thought proccess - POST GET
- read about ref and populate
- Create GET /request/received with all checks

- user should see all the user cards except
  his own card
  his connection
  ignored people
  already sent a connection request
- Logic for GET /feed api
- explore the $nin, $and ,$ne and other query operators
