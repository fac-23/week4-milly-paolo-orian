const model = require("../database/model.js");

function get(req, res, next) {
  const user = req.session;
  model
    .getPosts()
    .then((result) => {
      // create array of posts
      const posts = result
        .map((post) => {
          return `<li>
      <p>${user.userObj.username}</p>
      <p>${post.caption}</p>
      
      ${
        post.img
          ? `<img id="post-img" src="/post/${post.id}/img" alt="${post.caption}">`
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
    <h1>
    <img class="logo" src="Petarazzi.jpg" alt="Petarazzi, post your pet pictures">
    </h1>
      <div class="links">
        <a href="/">Return to Home Page</a>
        <a href="/profile">Return to Profile</a>
      </div>
      
      <ul>
    ${posts}
      </ul>
    </div>
  </body>
</html>`;

      res.send(html);
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });
}

module.exports = { get };
