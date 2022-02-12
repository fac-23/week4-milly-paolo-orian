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
          <h1 id="profile"><img class="logo" src="Petarazzi.jpg" alt="Petarazzi, post your pet pictures">
            Hello ${user.userObj.username}
          </h1>
        <div class="links">  
        <a href="/">Return to Home Page</a>
        
        <form method="POST" action="/log-out" novalidate>
            <button type="submit">Log Out</button>
        </form>
        </div>
    
        <form enctype="multipart/form-data" method="POST" action="/add-post">

        <label for="caption">Caption your pet<span aria-hidden="true">*</span></label>
        <div id="captionRequirements">Caption should be no more than 140 characters</div>
        <input name="caption" id="caption" type="text" aria-label="Caption your Pet" aria-describedby="captionRequirements" maxlength="140" required>

        <label for="image">Post Image of your pet<span aria-hidden="true">*</span></label>
        <input name="image" id="image" type="file" aria-label="Post image of your pet" required>
        
        <button type="submit">Submit</button>
        </form>
        </div>
    </body>
    </html>`;
  res.send(html);
}

module.exports = { get };
