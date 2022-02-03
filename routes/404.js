function sendError(req, res) {
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Petarazzi - 404</title>
  </head>
  <body>
    
    <div class="wrapper">
    
      <h1>There was an error, please head back to home page</h1>
      <a href="/">Back to home</a>

    </div>

  </body>
  </html>
  `;

  res.status(404).send(html);
}

module.exports = { sendError };
