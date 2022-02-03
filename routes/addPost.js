const model = require("../database/model.js");
const helpers = require("../helpers.js");

function post(req, res, next) {
  // get user inputs from req.body

  const sanitisedInputs = helpers.sanitise(req.body.caption);

  const [caption] = sanitisedInputs;

  const img = req.file;
  // console.log("req.file", img);
  const userId = req.session.userObj.id;
  //  insert caption and img into DB posts table
  return model
    .createPost(caption, img.buffer, userId)
    .then(() => {
      res.redirect("/news-feed");
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });
}

module.exports = { post };
