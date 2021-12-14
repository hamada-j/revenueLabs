'use strict';
const mysql = require("mysql");

console.log(`Before connect to MySQL by Clever Cloud -> \n\n`);

const { 
  NODE_ENV, 
  HOST_PROD, 
  USER_PROD, 
  PASSWORD_PROD, 
  PORT_PROD, 
  DATABASE_PROD, 
  HOST_TEST, 
  USER_TEST, 
  PASSWORD_TEST, 
  PORT_TEST, 
  DATABASE_TEST, 
  LIMIT 
} = process.env;

const DB_TEST = {
  connectionLimit: LIMIT,
  host: HOST_TEST,
  user: USER_TEST,
  password: PASSWORD_TEST,
  port: PORT_TEST,
  database: DATABASE_TEST
}

const DB_PROD = {
  connectionLimit: LIMIT, //important it is in dev mode (limited)
  host: HOST_PROD,
  user: USER_PROD,
  password: PASSWORD_PROD,
  port: PORT_PROD,
  database: DATABASE_PROD
}

exports.connect = () => {
  let pool;
  if (NODE_ENV === "test") {
    pool = mysql.createPool(DB_TEST);
  } else {
    pool = mysql.createPool(DB_PROD)
  }
  global.db = pool;
  console.log(`Connected to MySQL by Clever Cloud on ${NODE_ENV} ->\n\n`);
};

// exports.get = function() {
//   return pool;
// };
