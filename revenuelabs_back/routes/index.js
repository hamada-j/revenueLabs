'use strict';
// Core
const express = require('express');
const router = express.Router();
const { check } = require("express-validator");

// Middleware
const tMiddleware = require("../middleware/checkToken");

// Controller
const getAllCivilizations = require('../controller/getAllCivilizations');
const getMoreDataForCivilization = require('../controller/getMoreDataForCivilization');
const getFavoriteCivilizationsUser = require('../controller/getFavoriteCivilizationsUser');
const auth = require('../controller/auth');

/**
* @swagger
* tags:
*   name: revenueLabs_back
*   description: Build a small REST API Reads data from external api and serves responses as JSON documents, register/login a user and make get a favorite civilization witch she/he selected limited to 3 choices.
*/

/**
* @swagger
* securityDefinitions:
*   authentication:
*     type: apiKey  
*     name: token
*     in: header
*
*/

/**
* @swagger
* definitions:
*   urlSchema:
*     type: object
*     required:
*       - url
*     properties:
*       url:
*         type: string
*/

/**
* @swagger
* definitions:
*   updateSchema:
*     type: object
*     required:
*       - userId
*       - civilizationsId
*       - checked
*     properties:
*       userId:
*         type: number
*       civilizationsId:
*         type: number
*       checked:
*         type: boolean
*/

/**
* @swagger
* definitions:
*   userSchema:
*     type: object
*     required:
*       - userName
*     properties:
*       userName:
*         type: string
*         security: object
*/

/**
* @swagger
* /all-civilizations:
*   get:
*     summary: "Get all civilizations form the external api and serve them to front"
*     tags: [Get All Civilizations]
*     produces:
*       - application/json:
*         content:
*           application/json:
*             schema:
*               type: object
*     responses:
*       200:
*         description: Success response.
*       401:
*         description: Information is missing or invalid. Incorrect URL
*       502:
*         description: Could not get data from external api or Server
*
*/
router.get("/all-civilizations", getAllCivilizations.getData);

/**
* @swagger
* /all-civilizations/{id}:
*   get:
*     summary: "Get a civilization by id form the external api and serve them to front"
*     tags: [Get Civilization by Id]
*     produces:
*       - application/json:
*         content:
*           application/json:
*             schema:
*               type: object
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: integer
*         description: The id of the civilization (1 to 32).
*
*     responses:
*       200:
*         description: Success response.
*       401:
*         description: Information is missing or invalid. Incorrect URL
*       502:
*         description: Could not get data from DB or Server
*
*/
router.get("/all-civilizations/:id", getAllCivilizations.getDataById);

/**
* @swagger
* /civilization-extra-data:
*   post:
*     summary: "The data of properties of a civilization"
*     tags: [Post For More Data Of Civilization]
*     produces:
*       - application/json:
*         content:
*           application/json:
*             schema:
*               type: object
*     parameters:
*       - in: body
*         name: body
*         required: true
*         description: object to pass an url.
*         schema:
*            $ref: "#/definitions/urlSchema"
*     requestBody:
*      content:
*       application/json:
*        schema:   
*         $ref: "#/definitions/urlSchema"         
*     responses:
*       201:
*         description: Post one 
*       401:
*         description: Bad Request
*       502:
*         description: Internal Server Error
*/
router.post("/civilization-extra-data", getMoreDataForCivilization.getData);


/**
* @swagger
* /all-favorite-civilizations/{userId}:
*   get:
*     summary: "Get all civilizations with the favorite civilizations of an usr form the external api and serve them to front"
*     tags: [Get Favorite Civilizations With Fav User]
*     produces:
*       - application/json:
*         content:
*           application/json:
*             schema:
*               type: object
*     parameters:
*       - in: path
*         name: userId
*         schema:
*           type: integer
*         description: The user id.
*     security:
*       - authentication: []
*     responses:
*       200:
*         description: Success response.
*       401:
*         description: Information is missing or invalid. Incorrect URL
*       502:
*         description: Could not get data from DB or Server
*
*/
router.get("/all-favorite-civilizations/:userId", tMiddleware.checkToken, getFavoriteCivilizationsUser.getData);


/**
* @swagger
* /update-all-favorite-civilizations:
*   put:
*     summary: "Update favorite-civilizations"
*     tags: [Update Favorite Civilizations]
*     produces:
*       - application/json:
*         content:
*           application/json:
*             schema:
*               type: object
*     parameters:
*       - in: body
*         name: body
*         required: true
*         description: object to update a fav civilizations.
*         schema:
*            $ref: "#/definitions/updateSchema"
*     security:
*       - authentication: []
*     requestBody:
*      content:
*       application/json:
*        schema:   
*         $ref: "#/definitions/updateSchema"         
*     responses:
*       200:
*         description: Post one 
*       401:
*         description: Bad Request
*       501:
*         description: Internal Server Error
*       403:
*         description: Validation errors
*
*/
router.put("/update-all-favorite-civilizations", tMiddleware.checkToken, getFavoriteCivilizationsUser.updateData);


/**
* @swagger
* /register-with-username:
*   post:
*     summary: "Register a new user in the Api"
*     tags: [Register a User]
*     produces:
*       - application/json:
*         content:
*           application/json:
*             schema:
*               type: object
*     parameters:
*       - in: body
*         name: body
*         required: true
*         description: object with url.
*         schema:
*            $ref: "#/definitions/userSchema"
*     requestBody:
*      content:
*       application/json:
*        schema:   
*         $ref: "#/definitions/userSchema"         
*     responses:
*       200:
*         description: Get one 
*       400:
*         description: Bad Request
*       500:
*         description: Internal Server Error
*       401:
*         description: Validation errors
*/
router.post(
  "/register-with-username",
  [
    check("userName", "user name should be 3 or 10 characters")
      .isLength({ min: 3, max: 10 })
      .isAlphanumeric()
  ], 
  auth.register
);

/**
* @swagger
* /login-with-username:
*   post:
*     summary: "Login a user in the Api with username"
*     tags: [Login a User with UserName]
*     produces:
*       - application/json:
*         content:
*           application/json:
*             schema:
*               type: object
*     parameters:
*       - in: body
*         name: body
*         required: true
*         description: object with url.
*         schema:
*            $ref: "#/definitions/userSchema"
*     requestBody:
*      content:
*       application/json:
*        schema:   
*         $ref: "#/definitions/userSchema"         
*     responses:
*       200:
*         description: Get one 
*       400:
*         description: Bad Request
*       500:
*         description: Internal Server Error
*       401:
*         description: Validation errors
*/
router.post("/login-with-username", auth.login);

module.exports = router;
