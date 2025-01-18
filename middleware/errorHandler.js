const { logEvents } = require("./logger");

const errorHandler = (err, req, res, next) => {
  const { name, message } = err;
  const { method, url, headers } = req;

  logEvents(
    `${name} , ${message} , ${method} , ${url} , ${headers.origin}`,
    "errorLog.log"
  );
  const status = res.statusCode ? res.statusCode : 500;

  res.status(status);
  res.json({ message: err.message, isError: true });
  console.log("ERROR HANDLER");
};

module.exports = errorHandler