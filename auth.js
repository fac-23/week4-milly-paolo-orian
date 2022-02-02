const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const model = require("./database/model.js");
// const { user } = require("pg/lib/defaults");

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
function createUser(username, email, password) {
  return bcrypt.hash(password, 10).then((hashedPassword) => {
    return model.createUserDb(username, email, hashedPassword);
  });
}

// Create sid and insert session into database, returns the sid
function saveUserSession(userObj) {
  const sid = crypto.randomBytes(18).toString("base64");
  // console.log(userObj);
  return model.createSession(sid, { userObj });
}

// verify user function
// model.getUser and verify password
function verifyUser(email, password) {
  return model.getUser(email).then((userObj) => {
    return bcrypt.compare(password, userObj.password).then((match) => {
      // if not match, send an error
      if (!match) {
        throw new Error(
          `<h1>Could not find user</h1>
          <a href="/">Sign up on homepage</a>`
        );
        // if ther is a match, call auth.saveUserSession to create a session in the db and return the sid
      } else {
        delete userObj.password;
        return userObj;
      }
    });
  });
}

module.exports = { COOKIE_OPTIONS, createUser, saveUserSession, verifyUser };
