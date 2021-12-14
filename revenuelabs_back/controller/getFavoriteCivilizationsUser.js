// 'use strict';
// const externalAPI = require("../services/ExternalApi/getExternalData");
// const favoriteCivilizations = require("../services/FavoriteCivilizations/favoriteCivilizations");
// const extend = require("util")._extend;
// const { API_CIVILIZATIONS } = process.env;

// // exports.getData = async (req, res, next) => {
// //   const id = req.params.userId;
// //   try {
// //     await favoriteCivilizations.getFavoriteCivilizations(id).then( async (row) => {  

// //       const arrFavoriteCivilizations = [];

// //       const favorite = row.favoriteCivilizations.split(`,`).map(num => +num);

// //       await externalAPI.getData(API_CIVILIZATIONS).then((data) => {
// //           for(let i = 0; i < data.civilizations.length; i++) {
// //             // const civilizationCopy = extend({}, data.civilizations[i]);
// //             if(favorite.includes(data.civilizations[i].id)){
// //               data.civilizations[i].favoriteCivilizations = true;
// //               arrFavoriteCivilizations.push(data.civilizations[i]);
// //             } else {
// //               data.civilizations[i].favoriteCivilizations = false;
// //               arrFavoriteCivilizations.push(data.civilizations[i]);
// //             }
// //           }
// //           res.status(200).json({ civilizations: arrFavoriteCivilizations});            
// //         }).catch((error) => {
// //           res.status(401).json({ error: 'error external API \n' + error });  
// //         });
// //     }).catch((error) => {
// //       res.status(401).json({ error: 'error FavoriteCivilizations \n' + error });  
// //     });
// //   } catch (error) {
// //     res.status(501).json({ message: `Could not get data from error external API!`, error: error})
// //   }
// // }


// exports.getData = async (req, res) => {
//   const id = req.params.userId;
//   const arrFavoriteCivilizations = [];
//   try {
//     const response = await favoriteCivilizations.getFavoriteCivilizations(id);
//     console.log('.........>', response);
//     const favorite = await response.favoriteCivilizations.split(`,`).map(num => +num);
//     const civilizations = await externalAPI.getData(API_CIVILIZATIONS)

//     civilizations.civilizations.forEach(civilization =>{
//       if(favorite.includes(civilization.id)){
//         civilization.favoriteCivilizations = true;
//         arrFavoriteCivilizations.push(civilization);
//       } else {
//         civilization.favoriteCivilizations = false;
//         arrFavoriteCivilizations.push(civilization);
//       }
//     })
//     res.status(200).json({ civilizations: arrFavoriteCivilizations});
//   } catch (error) {
//     console.log(error)
//     res.status(501).json({ message: `Could not get data from error external API!`, error: error})
//   }
// }

// exports.updateData = async (req, res, next) => {
//   const userId = req.body.userId;
//   const civilizationsId = req.body.civilizationsId;
//   const checked = req.body.checked;
//   try {
//     await favoriteCivilizations.getFavoriteCivilizations(userId).then( async (row) => {   
//       const arrFavoriteCivilizations = [];
//       let favorite = row.favoriteCivilizations.split(`,`).map(num => +num);

//       if (checked === true){
//         if (favorite.length === 3) favorite.shift();
//         favorite.push(civilizationsId);
//       } else {
//         favorite = favorite.filter((item) => {
//           return item !== civilizationsId;
//         });
//       }   
//       let newFavorite = favorite.toString();
//       await favoriteCivilizations.updateFavoriteCivilizations(newFavorite, userId).then( async (result) => {
//         await externalAPI.getData(API_CIVILIZATIONS).then((data) => {
//           for(let i = 0; i < data.civilizations.length; i++) {
//             // const civilizationCopy = extend({}, data.civilizations[i]);
//             if(favorite.includes(data.civilizations[i].id)){
//               data.civilizations[i].favoriteCivilizations = true;
//               arrFavoriteCivilizations.push(data.civilizations[i]);
//             } else {
//               data.civilizations[i].favoriteCivilizations = false;
//               arrFavoriteCivilizations.push(data.civilizations[i]);
//             }
//           }
//           res.status(200).json({ civilizations: arrFavoriteCivilizations});            
//         }).catch((error) => {
//           res.status(401).json({ error: 'error external API \n' + error });  
//         });     
//       }).catch((error) => {
//           res.status(402).json({ error: 'error updateFavoriteCivilizations API \n' + error });  
//         }); ;

//     }).catch((error) => {
//       res.status(403).json({ error: 'error FavoriteCivilizations \n' + error });  
//     });
//   } catch (error) {
//     res.status(501).json({ message: `Could not get data from error external API!`, error: error})
//   }
// }


'use strict';
const externalAPI = require("../services/ExternalApi/getExternalData");
const favoriteCivilizations = require("../services/FavoriteCivilizations/favoriteCivilizations");
const extend = require("util")._extend;
const { API_CIVILIZATIONS } = process.env;

exports.getData = async (req, res) => {
  const id = req.params.userId;
  const arrFavoriteCivilizations = [];
  try {
    const response = await favoriteCivilizations.getFavoriteCivilizations(id)
    const favorite = response.favoriteCivilizations.split(`,`).map(num => +num);
    const results = await externalAPI.getData(API_CIVILIZATIONS)
    results.civilizations.forEach(civilization =>{
      civilization.favoriteCivilizations = favorite.includes(civilization.id);
      arrFavoriteCivilizations.push(civilization);
    })
    res.status(200).json({ civilizations: arrFavoriteCivilizations});
  } catch (error) {
    res.status(501).json({ message: `Could not get data from error external API!`, error: error})
  }
}


exports.updateData = async (req, res, next) => {
  const userId = req.body.userId;
  const civilizationsId = req.body.civilizationsId;
  const checked = req.body.checked;
  const arrFavoriteCivilizations = [];

  try {
    const response = await favoriteCivilizations.getFavoriteCivilizations(userId);
    let favorite = await response.favoriteCivilizations.split(`,`).map(num => +num);

    if (checked === true){
      if (favorite.length === 3) favorite.shift();
      favorite.push(civilizationsId);
    } else {
      favorite = favorite.filter(item=> item !== civilizationsId)
    }

    let newFavorite = favorite.toString();

    await favoriteCivilizations.updateFavoriteCivilizations(newFavorite, userId);
    const results = await externalAPI.getData(API_CIVILIZATIONS);
    results.civilizations.forEach(civilization =>{
      civilization.favoriteCivilizations = favorite.includes(civilization.id);
      arrFavoriteCivilizations.push(civilization);
    })
    res.status(200).json({ civilizations: arrFavoriteCivilizations});
  } catch (error) {
    res.status(501).json({ message: `Could not get data from error external API!`, error: error})
  }
}   