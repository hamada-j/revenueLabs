'use strict';

const nameExists = pName => {

  return new Promise((resolve, reject) => {
    db.query(
      "select * from users where userName = ?",
      [pName],
      (err, rows) => {
        if (err) return reject(err);
        if (rows.length === 0) return resolve(null);
        resolve(rows[0]);
      }
    );
  });
};

module.exports = {
  nameExists: nameExists
};
