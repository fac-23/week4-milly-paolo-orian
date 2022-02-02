const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const model = require("./database/model.js");

// cookie attribute object to pass when assigning cookies
const COOKIE_OPTIONS = {
    // prevent client-side JS from accessing cookie
    httpOnly: true,
    // no. of milliseconds the cookie will be valid for
    maxAge: 600000,
    // stop cookie from being sent on requests made from other domains
    sameSite: "lax",
    // specify if cookie is signed
    signed: true,
    // only send cookie to the server with an encrypted request over HTTPS (for production only)
    // secure: true
  };




// SIGNING UP //

// Hash the password and insert user into database and returns user object with id, email and username
function createUser( username, email, password ) {
  return bcrypt.hash(password, 10).then((hashedPassword) => {
    return model.createUserDb( username, email, hashedPassword );
  })
}

// Create sid and insert session into database, returns the sid
function saveUserSession(userObj) {
  const sid = crypto.randomBytes(18).toString("base64");
  // console.log(userObj);
  return model.createSession(sid, { userObj });
}






  module.exports = { COOKIE_OPTIONS, createUser, saveUserSession }