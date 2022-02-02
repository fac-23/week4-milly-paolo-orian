const db = require("./connection.js");


// SIGNING UP //

// Insert user into database and return user object
function createUserDb( username, email, hashedPassword) {
  const INSERT_USER = `INSERT INTO users ( username, email, password) VALUES ( $1, $2, $3 ) RETURNING id, username, email`;

  return db.query(INSERT_USER, [username, email, hashedPassword])
    .then((result) => {
      // console.log("createUserDb", result.rows[0]);
      return result.rows[0]; 
      // { id: 3, username: 'Luigi', email: 'luigi@nintendo' }
    })
}

// Insert session into database and return sid
function createSession(sid, userObj) {
  const INSERT_SESSION = `INSERT INTO sessions ( sid, data ) VALUES ( $1, $2 ) RETURNING sid`;

  return db.query(INSERT_SESSION, [sid, userObj])
    .then((result) => {
      return result.rows[0].sid;
    })
}


// Takes an sid and selects the userObj data from the sessions table.
function getSession(sid) {
  const SELECT_SESSION = `SELECT data FROM sessions WHERE sid = $1`;
 
  return db.query(SELECT_SESSION, [sid])
    .then((result) => {
      // console.log("model.getSession", result.rows[0].data);
      return result.rows[0].data;
      // model.getSession { userObj: { id: 6, username: 'cat', email: 'cat@pot' } }
    })
}


module.exports = { createUserDb, createSession, getSession }