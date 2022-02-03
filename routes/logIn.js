const auth = require("../auth.js");
const helpers = require("../helpers.js");

function get(req, res) {
  const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="style.css">
        <title>Pets App Log In</title>
    </head>
    <body>
        
        <div class="wrapper">
            <h1>Pet App Log In</h1>
        <div class="links">  
        <a href="/" aria-label="Return to Home Page">Return to Home Page</a>
        </div>
    
        <form method="POST" action="/log-in">

        <label for="email">Email<span aria-hidden="true">*</span></label>
        <div id="emailRequirements">Email should be a valid email</div>
        <input name="email" id="email" type="email" aria-label="Enter your email" required>

        <label for="password">Password<span aria-hidden="true">*</span></label>
        <div id="passwordRequirements">Password should be at least 8 characters long</div>
        <input name="password" id="password" type="password" aria-label="Enter your password" aria-describedby="emailRequirements" minlength="8" required>

        <button type="submit" aria-label="Click button to Submit">Submit</button>
        </form>
        </div>
    </body>
    </html>`;
  res.send(html);
}

// call auth.verifyUser function, return user obj without password
// this calls model.getUser to find the user in the db by their email and return the user object
// hash the password the user inserted and compare with the stored one (bcrypt.compare)
// assign a cookie with the sid
// redirect to profile
// catch block that calls next(error)

function post(req, res) {
  const sanitisedInputs = helpers.sanitise(req.body.email, req.body.password);

  const [email, password] = sanitisedInputs;

  auth
    .verifyUser(email, password)
    .then((userObj) => auth.saveUserSession(userObj))
    .then((sid) => {
      res.cookie("sid", sid, auth.COOKIE_OPTIONS);
      res.redirect("/profile");
    })
    .catch((error) => {
      console.error(error);
      const userNotFound = `
      <h1>User not found. Have you signed up?</h1>
      <a href="/">Sign up</a>
      `;
      res.send(userNotFound);
    });
}

module.exports = { get, post };
