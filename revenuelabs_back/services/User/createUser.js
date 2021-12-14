'use strict';

const create = ( user ) => {
  return new Promise((resolve, reject) => {
    db.query(
      "insert into users ( userName ) values (?)",
      [ user.userName ],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

module.exports = {
  create: create,
};