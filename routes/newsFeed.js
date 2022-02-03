const model = require("../database/model.js");

function get(req, res) {
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
}

module.exports = { get };