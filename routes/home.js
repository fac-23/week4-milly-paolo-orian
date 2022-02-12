function get(req, res) {
  const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="style.css">
        <title>Petarazzi</title>
    </head>
    <body>
        <div class="wrapper">
            <h1>
            <img class="logo" src="Petarazzi.jpg" alt="Petarazzi, post your pet pictures">
            </h1>
            
        <div class="links">  
            <a href="/sign-up">Sign up</a>
        <a href="/log-in">Log in</a>
        </div> 
        </div>
        
    </body>
    </html>`;
  res.send(html);
}

module.exports = { get };
