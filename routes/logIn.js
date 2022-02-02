function get (req,res) {
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
        <label for="email">Email</label>
        <input name="email" id="email" type="email" aria-label="Enter your email">
        <label for="password">Password</label>
        <input name="password" id="password" type="password" aria-label="Enter your password">
        <button type="submit" aria-label="Click button to Submit">Submit</button>
        </form>
        </div>
    </body>
    </html>`
    res.send(html)
}

function post (req, res) {
    // destructure the email and password from req.body
    const { email, password } = req.body;
    console.log(email, password);
    // call auth.verifyUser function 
    // this calls model.getUser to find the user in the db by their email and return the user object
    // hash the password the user inserted and compare with the stored one (bcrypt.compare)
    // if not match, send an error
    // if ther is a match, call auth.saveUserSession to create a session in the db and return the sid
    // assign a cookie with the sid
    // redirect to profile
    // catch block that calls next(error)
    res.send('Hello');

}

module.exports = {get, post}