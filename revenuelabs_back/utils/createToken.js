'use strict';
const moment = require("moment");
const jwt = require("jwt-simple");

const createToken = pUser => {

  const payload = {
    userName: pUser,
    dateCreation: moment().unix(),
    dateExpiration: moment()
      .add(10, "minutes")
      .unix()
  };

  return jwt.encode(payload, process.env.TOKEN);
  
};

module.exports = createToken;