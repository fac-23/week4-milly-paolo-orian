function checkAuth(req, res, next) {
  // assign req.session to a 'user' variable
  const user = req.session;
  // req.session { userObj: { id: 5, username: 'peach', email: 'peach@nintendo' } }
  // check if user exists
  // if not, set a res status of 401 and send a 'please log in' html template
  // else, call next()
  if (!user) {
    res
      .status(401)
      .send(
        `<h1>You must log in to view this content!</h1><a href="/">Back to home</a>`
      );
  } else {
    next();
  }
}

module.exports = checkAuth;
