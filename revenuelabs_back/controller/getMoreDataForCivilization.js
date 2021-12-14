// 'use strict';
// const externalAPI = require("../services/ExternalApi/getExternalData");

// exports.getData = async (req, res, next) => {
//   const url = req.body.url;
//   try {
//     await externalAPI.getData(url).then(async (response) => {
//       const data = [];
//       data.push(response);
//       res.status(200).json({ extraData: data });        
//     }).catch((error) => {
//       res.status(401).json({ error: 'error external API \n' + error });  
//     });
//   } catch (error) { 
//     res.status(502).json({ message: `Could not get data from error external API!`, error: error})
//   }
// }

'use strict';
const externalAPI = require("../services/ExternalApi/getExternalData");

exports.getData = async (req, res, next) => {
  const url = req.body.url;
  const data = [];
  try {
    const response = await externalAPI.getData(url)
    data.push(response);
    res.status(200).json({ extraData: data });
  } catch (error) {
    res.status(error.statusCode).json({ message: `Could not get data from error external API!`, error: error})
  }
}
