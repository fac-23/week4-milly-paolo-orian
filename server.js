// require express server
const express = require("express");
const server = express();

// MIDDLEWARE //

const bodyParser = express.urlencoded({ extended: false });
const staticHandler = express.static("public");
const cookieParser = require("cookie-parser");

// If it finds the session it will attach the userObj data to a new "session" property of the request object
const getSession = require("./middleware/getSession.js");
// check user is authenticated
const checkAuth = require("./middleware/checkAuth.js");
const handleErrors = require("./middleware/handleErrors.js");

server.use(bodyParser);
server.use(staticHandler);
// eslint-disable-next-line no-undef
server.use(cookieParser(process.env.COOKIE_SECRET));
server.use(getSession);
server.use(handleErrors);

// ROUTES //

const home = require("./routes/home.js");
const signUp = require("./routes/signUp.js");
const logIn = require("./routes/logIn.js");
const logOut = require("./routes/logOut.js");
const profile = require("./routes/profile.js");
const addPost = require("./routes/addPost.js");
const newsFeed = require("./routes/newsFeed.js");
const imgPath = require("./routes/imgPath.js");
const sendError = require("./routes/404.js");


// Home //
// Display sign up and log in links
server.get("/", home.get);

// Sign Up //
// Display sign up form
server.get("/sign-up", signUp.get);
// // Create user and create session in database
server.post("/sign-up", signUp.post);

// Log In //
// Display form to log in
server.get("/log-in", logIn.get);
// // Retrieve session and user from database
server.post("/log-in", logIn.post);

// Log Out //
// Delete cookie and session from database
server.post("/log-out", logOut.post);

// Profile //
// serve profile page with form
server.get("/profile", checkAuth, profile.get);

//  Add Post //
// require multer middleware
const multer = require("multer");
// attach file object containing file properties to req object
const imgUpload = multer().single("image");
// Process user input and img into database and redirect to newsfeed
server.post("/add-post", checkAuth, imgUpload, addPost.post);

// News Feed //
// Get all posts from database and display them
server.get("/news-feed", checkAuth, newsFeed.get);

// Img Path //
// dynamic img endpoint for img tag to to make a request to
server.get("/post/:id/img", imgPath.get);

server.use(sendError.sendError);

// assign port to deployed or local port
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});