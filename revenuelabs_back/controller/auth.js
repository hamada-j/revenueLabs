'use strict';
const { validationResult } = require("express-validator");
const createToken = require("../utils/createToken");
const newUser = require("../services/User/createUser");
const checkUser = require("../services/User/existsUser");
const favoriteCivilizations = require("../services/FavoriteCivilizations/favoriteCivilizations");

exports.register = async (req, res) => {   
  const errors = validationResult(req);
  const userName = await checkUser.nameExists(req.body.userName); 
  if (!errors.isEmpty() || userName) {
      return res.status(422).json(errors.array()); 
  } 
  try {
    const user = {
      userName: req.body.userName,
    }
    const result = await newUser.create(user);
    const userSQL = await checkUser.nameExists(user.userName);
    await favoriteCivilizations.addFavoriteCivilizations(userSQL.id, '0')
    res.status(201).json({user: userSQL, result: result, success: createToken(user)}); 
         
  } catch (err) {
    //return res.status(401).json(errors.array()); 
    return res.status(401).json(err);
  }
}

exports.login = async (req, res) => { 
  try {
    const name = req.body.userName;
    const user = await checkUser.nameExists(name);
    if (!user) {
      res.status(401).json({ error: `error in this user name: ${ name }` });
    } else {
      res.status(201).json({ user: user, success: createToken(user)}); 
    }
  } catch (err) {
    res.status(401).json({ error: `error in /login_with_username:\n${ err }` });
  }
}