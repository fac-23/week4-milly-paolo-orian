const { deleteSession } = require("../database/model.js");

function post(req, res) {
  const sid = req.signedCookies.sid;
  deleteSession(sid).then(() => {
    res.clearCookie("sid");
    res.redirect("/");
  });
}

module.exports = { post };
