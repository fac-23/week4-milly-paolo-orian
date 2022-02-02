// require express server
const express = require("express");
const server = express();

// body parser middleware to parse request body
const bodyParser = express.urlencoded({ extended: false });
// use in all routes
server.use(bodyParser);

// add static handler to allow access to all files inside public
const staticHandler = express.static("public");
server.use(staticHandler);

// cookie parser
const cookieParser = require("cookie-parser");
// eslint-disable-next-line no-undef
server.use(cookieParser(process.env.COOKIE_SECRET));

// MIDDLEWARE //

// If it finds the session it will attach the userObj data to a new "session" property of the request object
const getSession = require("./middleware/getSession.js");
const checkAuth = require("./middleware/checkAuth.js");
const handleErrors = require("./middleware/handleErrors.js");

server.use(getSession);
server.use(handleErrors);

// ROUTES //

const home = require("./routes/home.js");
const signUp = require("./routes/signUp.js");
const logIn = require("./routes/logIn.js");
// const logOut = require("./routes/logOut.js");
const profile = require("./routes/profile.js");
// const addPost = require("./routes/addPost.js");
const newsFeed = require("./routes/newsFeed.js");

// Home //
// Display sign up and log in links
server.get("/", home.get);

// // Sign Up //
// // Display sign up form
server.get("/sign-up", signUp.get);
// // Create user and create session in database
server.post("/sign-up", signUp.post);

// // Log In //
// // Display form to log in
server.get("/log-in", logIn.get);
// // Retrieve session and user from database
// server.post("/log-in", logIn.post);

// // Log Out //
// // Delete cookie and session from database
// server.get("/log-out", logOut.get);

// // Profile //
// // serve profile page with form
server.get("/profile", checkAuth, profile.get);
// // Process user input into database and redirect to newsfeed
// server.post("/add-post", checkAuth, addPost.post);

// // Newsfeed //
// // Gets all the posts from database and displays them
server.get("/news-feed", checkAuth, newsFeed.get);

// assign port to deployed or local port
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
