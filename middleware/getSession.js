const model = require("../database/model.js");

function getSession(req, res, next) {
  // read the signed cookie from the request and assign to sid variable
  const sid = req.signedCookies.sid;
  // call a model.getSession function that gets the userData object from the database based on the sid
  model.getSession(sid).then((userObj) => {
    if (userObj) {
      req.session = userObj;
    }
    next();
  });
  // if the userData exists, assign it to the session property on the req object
  // call next()
}

module.exports = getSession;
