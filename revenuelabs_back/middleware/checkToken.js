'use strict';
const jwt = require("jwt-simple");
const moment = require("moment");

// Model  Middleware
const checkToken = (req, res, next) => {
  
  if (!req.headers["token"]) {
    return res.status(417).json({
      message: " It is necessary add token to headers "
    });
  }

  const token = req.headers["token"];
  let payload = null;
  
  try {
    payload = jwt.decode(token, process.env.TOKEN);
  } catch (err) {
    return res.status(401).json({
      message: "It is not possible to decode the Token"
    });
  }

  const dateNow = moment().unix();
  if (dateNow > payload.dateExpiration) {
    return res.status(401).json({
      message: "The toke has expired.",
    });
  }

  req.payload = payload;

  next();
};

module.exports = {
  checkToken: checkToken,
};