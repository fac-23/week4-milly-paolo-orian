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
// require multer middleware
const multer = require("multer");
// attach file object containing file properties to req object
const imgUpload = multer().single("image");
// Process user input and img into database and redirect to newsfeed
server.post("/add-post", checkAuth, imgUpload, addPost.post);

// NEWS FEED //
// Get all posts from database and display them
server.get("/news-feed", checkAuth, newsFeed.get);

// IMG GET REQUEST //
// dynamic img endpoint for img tag to to make a request to
server.get("/post/:id/img", imgPath.get);

// NON MODULARISED CODE //
// const model = require("./database/model.js");

// server.post(
//   "/add-post",
//   checkAuth,
//   imgUpload.single("image"),
//   (req, res, next) => {
//     // get user inputs from req.body
//     const { caption } = req.body;
//     const img = req.file;
//     const userId = req.session.userObj.id;
//     //  insert caption and img into DB posts table
//     return model
//       .createPost(caption, img.buffer, userId)
//       .then(() => {
//         res.redirect("/news-feed");
//       })
//       .catch((error) => {
//         console.error(error);
//         next(error);
//       });
//   }
// );

// server.get("/news-feed", (req, res) => {
//   const user = req.session;
//   model.getPosts().then((result) => {
//     // create array of posts
//     const posts = result
//       .map((post) => {
//         return `<li>
//       <p>${user.userObj.username}</p>
//       <p>${post.caption}</p>

//       ${
//         post.img
//           ? `<img src="/post/${post.id}/img" alt="${post.caption}" width="64" height="64">`
//           : ""
//       }
//       </li>`;
//       })
//       .reverse()
//       .join("");

//     const html = `
//     <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <link rel="stylesheet" href="style.css" />
//     <title>Pets App News Feed</title>
//   </head>
//   <body>
//     <div class="wrapper">
//       <h1>Pets App News Feed</h1>
//       <div class="links">
//         <a href="/" aria-label="Return to Home Page">Return to Home Page</a>
//         <a href="/profile" aria-label="Return to Profile">Return to Profile</a>
//       </div>

//       <ul>
//     ${posts}
//       </ul>
//     </div>
//   </body>
// </html>`;

//     res.send(html);
//   });
// });

// server.get("/post/:id/img", (req, res) => {
//   model.getImg(req.params.id).then((user) => {
//     res.send(user.img);
//   });
// });

server.use(sendError.sendError);

// assign port to deployed or local port
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
