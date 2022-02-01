function get(req, res) {
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

      </ul>
    </div>
  </body>
</html>`;
  res.send(html);
}

module.exports = { get };
