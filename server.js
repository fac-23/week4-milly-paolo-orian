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
const logOut = require("./routes/logOut.js");
const profile = require("./routes/profile.js");
// const addPost = require("./routes/addPost.js");
// const newsFeed = require("./routes/newsFeed.js");
const sendError = require("./routes/404.js");

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
server.post("/log-in", logIn.post);

// // Log Out //
// // Delete cookie and session from database
server.post("/log-out", logOut.post);

// // Profile //
// // serve profile page with form
server.get("/profile", checkAuth, profile.get);

//  ADD POST //
// // Process user input into database and redirect to newsfeed
// server.post("/add-post", checkAuth, addPost.post);
const multer = require("multer");
const imgUpload = multer();

const model = require("./database/model.js");

server.post(
  "/add-post",
  checkAuth,
  imgUpload.single("image"),
  (req, res, next) => {
    // get user inputs from req.body
    const { caption } = req.body;
    const img = req.file;
    const userId = req.session.userObj.id;
    //  insert caption and img into DB posts table
    return model
      .createPost(caption, img.buffer, userId)
      .then(() => {
        res.redirect("/news-feed");
      })
      .catch((error) => {
        console.error(error);
        next(error);
      });
  }
);

// // Newsfeed //
// // Gets all the posts from database and display them
server.get("/news-feed", (req, res) => {
  const user = req.session;
  model.getPosts().then((result) => {
    // create array of posts
    const posts = result
      .map((post) => {
        return `<li>
      <p>${user.userObj.username}</p>
      <p>${post.caption}</p>
      
      ${
        post.img
          ? `<img src="/post/${post.id}/img" alt="${post.caption}" width="64" height="64">`
          : ""
      }
      </li>`;
      })
      .reverse()
      .join("");

    const html = `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Pets App News Feed</title>
  </head>
  <body>
    <div class="wrapper">
      <h1>Pets App News Feed</h1>
      <div class="links">
        <a href="/" aria-label="Return to Home Page">Return to Home Page</a>
        <a href="/profile" aria-label="Return to Profile">Return to Profile</a>
      </div>
      
      <ul>
    ${posts}
      </ul>
    </div>
  </body>
</html>`;

    res.send(html);
  });
});

server.get("/post/:id/img", (req, res) => {
  console.log("params", req.params);
  model.getImg(req.params.id).then((user) => {
    res.send(user.img);
  });
});

server.use(sendError.sendError);

// assign port to deployed or local port
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
