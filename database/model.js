const db = require("./connection.js");


// Insert user into database and return user object
function createUserDb( username, email, hashedPassword) {
  const INSERT_USER = `INSERT INTO users ( username, email, password) VALUES ( $1, $2, $3 ) RETURNING id, username, email`;

  return db.query(INSERT_USER, [username, email, hashedPassword])
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0];
    })

}


module.exports = { createUserDb }