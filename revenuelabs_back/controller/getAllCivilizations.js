// 'use strict';
// const externalAPI = require("../services/ExternalApi/getExternalData");
// const { API_CIVILIZATIONS, API_CIVILIZATION } = process.env;

// exports.getData = async (req, res, next) => {
//   try {
//     await externalAPI.getData(API_CIVILIZATIONS).then(async (response) => {
//       const data = response.civilizations;
//       res.status(200).json({ civilizations: data});         
//     }).catch((error) => {
//       res.status(401).json({ error: `error external API\n ${error}` });  
//     });  
//   } catch (error) {
//     res.status(502).json({ message: `Could not get data from error external API!`, error: error})
//   }
// }

// exports.getDataById = async (req, res, next) => {
//   const id = req.params.id;
//   try {
//     await externalAPI.getData(`${API_CIVILIZATION}/${id}`).then(async (response) => {
//       const data = [response];   
//       res.status(200).json({ civilization: data});         
//     }).catch((error) => {
//       res.status(401).json({ error: `error external API\n ${error}` });  
//     });   
//   } catch (error) {
//     res.status(502).json({ message: `Could not get data from error external API!`, error: error})
//   }
// }

'use strict';
const externalAPI = require("../services/ExternalApi/getExternalData");
const { API_CIVILIZATIONS, API_CIVILIZATION } = process.env;

exports.getData = async (req, res, next) => {
  try {
    const response = await externalAPI.getData(API_CIVILIZATIONS)
    res.status(200).json({ civilizations: response.civilizations});
  } catch (error) {
    res.status(500).json({ message: `Could not get data from error external API!`, error: error})
  }
}

exports.getDataById = async (req, res, next) => {
  const id = req.params.id;
  try {
   const response = await externalAPI.getData(`${API_CIVILIZATION}/${id}`)
   res.status(200).json({ civilization: [ response ] });
  } catch (error) {
    res.status(500).json({ message: `Could not get data from error external API!`, error: error})
  }
}