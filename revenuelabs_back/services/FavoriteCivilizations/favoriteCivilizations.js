'use strict';

const addFavoriteCivilizations = (userId, favoriteCivilizations) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT into favoriteCivilizations ( userId, favoriteCivilizations ) values (?,?)",
      [ userId, favoriteCivilizations ],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

// const addFavoriteCivilizations =  (userId, favoriteCivilizations) => {
//   return db.query( 
//     "INSERT into favoriteCivilizations ( userId, favoriteCivilizations ) values (?,?)",
//     [ userId, favoriteCivilizations ],
//   );
// };

const getFavoriteCivilizations = userId => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM favoriteCivilizations WHERE userId = ?",
      [ userId ],
      (err, rows) => {
        if (err) return reject(err);
        if (rows.length === 0) return resolve(null);
        resolve(rows[0]);
      }
    );
  });
};


const updateFavoriteCivilizations = (favoriteCivilizations, userId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE favoriteCivilizations SET favoriteCivilizations = ? WHERE userId = ?",
      [favoriteCivilizations, userId],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

module.exports = {

  addFavoriteCivilizations: addFavoriteCivilizations,
  getFavoriteCivilizations: getFavoriteCivilizations,
  updateFavoriteCivilizations: updateFavoriteCivilizations,
  
};