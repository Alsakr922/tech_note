const allowOrigins = require("./allowOrigins");
const corsOptions = {
  origin: (origin, callback) => {
    if (allowOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed By Cors"));
    }
  },
  credentials: true,
};

module.exports = corsOptions;
