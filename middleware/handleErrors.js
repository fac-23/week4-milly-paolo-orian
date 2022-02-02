const { STATUS_CODES } = require("http");

// eslint-disable-next-line no-unused-vars
function handleErrors(error, req, res, next) {
  // log the error
  console.error(error);
  // assign the status to error.status or default to 500
  const status = error.status || 500;
  // set the res.status to the status variable
  res.status(status);
  // check if in production by comparing the process.env.NODE_ENV equals production

  // eslint-disable-next-line no-undef
  const inProduction = process.env.NODE_ENV === "production";

  // to test the production error handling edit package.json scripts like so:
  // "dev": "NODE_ENV=production nodemon -r dotenv/config server.js"

  // if in production, display status code
  if (inProduction) {
    const message = STATUS_CODES[status];
    res.send(message);
  } else {
    // if not, display stack error
    res.send(`<pre>${error.stack}</pre>`);
  }
}

module.exports = handleErrors;
