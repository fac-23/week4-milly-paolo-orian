const model = require("../database/model.js");

function get(req, res) {
     model.getImg(req.params.id).then((user) => {
        res.send(user.img);
      });
}

module.exports = { get }