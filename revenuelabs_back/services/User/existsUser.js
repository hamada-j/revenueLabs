'use strict';

const nameExists = pName => {

  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM users WHERE userName = ?",
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
