const { expressjwt: jwt } = require("express-jwt");

const getTokenFromHeader = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.substring(0, 6) === "Bearer"
  ) {
    return req.headers.authorization.substring(
      7,
      req.headers.authorization.length
    );
  }
  return null;
};

const auth = {
  required: jwt({
    secret: process.env.SECRET_KEY,
    algorithms: ["HS256"],
    getToken: getTokenFromHeader,
  }),
  optional: jwt({
    secret: process.env.SECRET_KEY,
    algorithms: ["HS256"],
    credentialsRequired: false,
    getToken: getTokenFromHeader,
  }),
};

module.exports = auth;
