const auth = require("../auth.js");


function get (req, res) {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="style.css">
        <title>Pets App Sign Up</title>
    </head>
    <body>
        
        <div class="wrapper">
            <h1>Pet App Sign Up</h1>
        <div class="links">  
        <a href="/" aria-label="Return to Home Page">Return to Home Page</a>
        </div>
    
        <form method="POST" action="/sign-up">
        <label for="username">Username</label>
        <input name="username" id="username" type="text" aria-label="Enter your username">
        <label for="email">Email</label>
        <input name="email" id="email" type="email" aria-label="Enter your email">
        <label for="password">Password</label>
        <input name="password" id="password" type="password" aria-label="Enter your password">
        <button type="submit" aria-label="Click button to Submit">Submit</button>
        </form>
        </div>
    </body>
    </html>`
    res.send(html);
}

// create user and create session in database

function post(req, res) {

  // get data from request body
  const { username, email, password } = req.body;

  // call auth.createUser to hash password
  auth.createUser( username, email, password )
    .then(userObj => auth.saveUserSession(userObj))
    .then((sid) => {
      res.cookie('sid', sid, auth.COOKIE_OPTIONS);
      // console.log("req.session", req.session);
      // req.session { userObj: { id: 5, username: 'peach', email: 'peach@nintendo' } }
      res.redirect("/profile");
    })
    .catch((error) => { 
      console.error(error);  
      // next(error);
    })
  // then we get the user object and we create and save the session inside sessions table, returning sid

  // Create cookie with sid

  // Catch for errors

}

module.exports = {get, post}