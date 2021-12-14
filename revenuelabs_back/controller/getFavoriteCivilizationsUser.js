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
