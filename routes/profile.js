function get(req, res) {
  const user = req.session;
  const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="style.css">
        <title>Pets App Profile</title>
    </head>
    <body>
        
        <div class="wrapper">
            <h1>Hello ${user.userObj.username}</h1>
        <div class="links">  
        <a href="/" aria-label="Return to Home Page">Return to Home Page</a>
        
        <form method="POST" action="/log-out">
            <button type="submit">Log Out</button>
        </form>
        </div>
    
        <form enctype="multipart/form-data" method="POST" action="/add-post">

        <label for="caption">Caption your pet</label>
        <input name="caption" id="caption" type="text" aria-label="Caption your Pet">

        <label for="image">Post Image of your pet</label>
        <input name="image" id="image" type="file" aria-label="Post image of your pet">
        
        <button type="submit" aria-label="Click button to Submit">Submit</button>
        </form>
        </div>
    </body>
    </html>`;
  res.send(html);
}

module.exports = { get };
