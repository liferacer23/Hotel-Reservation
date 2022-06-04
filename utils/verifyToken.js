const jwt = require("jsonwebtoken");
const { createError } = require("../utils/error");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    next(createError(401, "You are not Authenticated"));
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
      if (err) {
        next(createError(403, "Token is invalid!!"));
      } else {
        req.user = userInfo;
        next();
      }
    });
  }
};

////////////////////////////////////
//FOR USER DELETE AND UPDATE

const verifyUser = (req, res, next) => {
  verifyToken(req, res, next,() => {
    if (req.user.id === req.params.id || req.user.isAdmin === true) {
      next();
    } else {
      next(createError(403, "You are not Authorized to do that :) !!"));
    }
  });
};
////////////////////////////////////

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res,next,() => {
    if (req.user.isAdmin === true) {
      next();
    } else {
      next(createError(403, "You are not Authorized to do that :) !!"));
    }
  });
};

module.exports.verifyToken = verifyToken;
module.exports.verifyUser = verifyUser;
module.exports.verifyAdmin = verifyAdmin;
