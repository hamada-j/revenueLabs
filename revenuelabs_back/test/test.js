'use strict';
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const favoriteCivilizations = require("../services/FavoriteCivilizations/favoriteCivilizations");
const externalAPI = require("../services/ExternalApi/getExternalData");
const checkUser = require("../services/User/existsUser");
const newUser = require("../services/User/createUser");
const createToken = require("../utils/createToken");
const name = require("../utils/createRandomName");

const { API_CIVILIZATION } = process.env;
const id = Math.floor(Math.random() * (32 - 1 + 1) + 1);

beforeEach(async (done) => {
  try {
    // TRUNCATE favoriteCivilizations has a FOREIGN KEY from users
    await db.query("TRUNCATE TABLE favoriteCivilizations", (err, rows) => {});
    done();
  } catch (err) {
    console.log(err);
  }
});
afterEach(async (done) => {
  try {
    await db.query("TRUNCATE TABLE favoriteCivilizations", (err, rows) => {});
    done();
  }catch (err) {
    console.log(err);
  }
});
afterAll( async done => {
  done();
  console.log("End of Test !!")
});

//"test:watch": "npm run test -- --watchAll --silent --verbose"
// 404 
test('GET /test, test 404 the response of the API for unknowns url', 
  async () => {
    try{
    await api
      .get('/test')
      .expect(404)
      .then((response) => {
        expect(response.body.error).toEqual('404: Not Found');
      });
    }catch(err){
      console.log(err);
    } 
});

// One civilization by Id
test('GET /all_civilizations/:id, test get a civilization by random id from the external api', 
  async () => {
    try{
      await supertest(app)
      .get(`/all_civilizations/${id}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toBeTruthy();
        expect(response.body.civilization[0].id).toEqual(id);
      }).catch((error) => { console.log(error);});
    }catch(err){
      console.log('error /all_civilizations/:id ', err);
    } 
});

// All civilizations
test('GET /all_civilizations, get all civilizations on this endpoint from external api.', 
  async () => {
    try{
    await api
      .get('/all_civilizations')
      .expect(200)
      .then( (response) => {
        expect(response.body).toBeTruthy();
        expect(Array.isArray(response.body.civilizations)).toBeTruthy();
        for( let i = 0; i < response.body.civilizations.length; i++ ) {
          expect(response.body.civilizations[i].id).toBe(i + 1);
        }
      }).catch((error) => { console.log(error);});
    } catch(err) {
      console.log('error GET /all_civilizations ---> ', err);
    } 
});

// Extra data
test(`GET /civilization_extra_data, get the extra data for one civilization.`, 
  async () => {
    try{
      const civilization = await externalAPI.getData(`${API_CIVILIZATION}/1`);
      const data = { url: civilization.unique_tech[0]};
    await api
      .post(`/civilization_extra_data`)
      .expect(200)
      .send(data)
      .then( (response) => {
        expect(response.body).toBeTruthy();
        expect(Array.isArray(response.body.extraData)).toBeTruthy();
      }).catch((error) => { console.log(error);});
    } catch(err) {
      console.log('error GET /civilization_extra_data ---> ', err);
    } 
});

test('GET /all_favorite_civilizations/:userId, create a user with a string of ids of favorite civilizations, create a token to get a this ids from MySQL database in Cloud', 
  async () => {
    try{
      const ids = '1,2,3';
      const user = {
        userName: name()
      };
      const result = await newUser.create(user);
      const userSQL = await checkUser.nameExists(user.userName);
      await favoriteCivilizations.addFavoriteCivilizations(userSQL.id, ids).then((response) => {
        //console.log(response)
      });
      const data = {
        user: userSQL, 
        result: result, 
        success: createToken(user)
      };
      const commonHeaders = { 
        'token': data.success
      };
      const arrayFavoritesCivilizationsIds = [];

      await api
      .get(`/all_favorite_civilizations/${userSQL.id}`)
      .set(commonHeaders)
      .expect(200)
      .then( (response) => {
        for (let i = 0; i < response.body.civilizations.length; i++) {
          if ( response.body.civilizations[i].favoriteCivilizations === true) {
            arrayFavoritesCivilizationsIds.push(response.body.civilizations[i].id)
          }
        };
        expect(arrayFavoritesCivilizationsIds.toString()).toEqual(ids);
        
      }).catch((error) => { console.log(error);});
    } catch(err) {
      console.log('error GET all_favorite_civilizations/:idUser ----> ', err);
    } 
});

// Update
test(`GET /update_all_favorite_civilizations , update a user fav civilizations`, 
  async () => {
    try{
      const ids = '1,2,3';
      const updateId = '4';
      let favorite = ids.split(`,`).map(num => +num);
      favorite.shift();
      favorite.push(Number(updateId));
      const user = {
        userName: name()
      };
      const result = await newUser.create(user);
      const userSQL = await checkUser.nameExists(user.userName);
      await favoriteCivilizations.addFavoriteCivilizations(userSQL.id, ids).then((response) => {
        //console.log(response)
      });
      const info = {
        user: userSQL, 
        result: result, 
        success: createToken(user)
      };
      const data = {
        userId: userSQL.id,
        civilizationsId: Number(updateId),
        checked: true
      };
      const commonHeaders = { 
        'token': info.success
      };
      const arrayFavoritesCivilizationsIds = [];

     await api
      .put(`/update_all_favorite_civilizations`)
      .set(commonHeaders)
      .send(data)
      .expect(200)
      .then( (response) => {
        expect(response.body).toBeTruthy();
        for (let i = 0; i < response.body.civilizations.length; i++) {
          if ( response.body.civilizations[i].favoriteCivilizations === true) {
            arrayFavoritesCivilizationsIds.push(response.body.civilizations[i].id)
          }
        };
        expect(arrayFavoritesCivilizationsIds.toString()).toEqual(favorite.toString());
      }).catch((error) => { console.log(error);});
    } catch(err) {
      console.log('error update update fav ---> ', err);
    } 
});


// Register
test(`GET /register_with_username, register a user (3 min to 10 max characters).`, 
  async () => {
    try{
      const user = {
        userName: name(),
      } 
    await api
      .post(`/register_with_username`)
      .send(user)
      .expect(201)
      .then( (response) => {
        expect(response.body).toBeTruthy();
        expect(response.body.result.affectedRows).toBe(1);
        expect(response.body.user.userName).toEqual(user.userName);
        expect(response.body.success).toBeTruthy();
      }).catch((error) => { console.log(error);});
    } catch(err) {
      console.log('error post / register ---> ', err);
    } 
});



// Login
test(`GET /login_with_username, login a user in system.`, 
  async () => {
    try{
      const user = {
        userName: name()
      };
      const result = await newUser.create(user);
      const userSQL = await checkUser.nameExists(user.userName);
      await favoriteCivilizations.addFavoriteCivilizations(userSQL.id, '0').then((response) => {
        //console.table(response)
      });

    await api
      .post(`/login_with_username`)
      .send(user)
      .expect(201)
      .then( (response) => {
        expect(response.body).toBeTruthy();
        expect(response.body.user.id).toBe(userSQL.id);
        expect(response.body.user.userName).toEqual(user.userName);
        expect(response.body.success).toBeTruthy();
      }).catch((error) => { console.log(error);});
    } catch(err) {
      console.log('error post / login ---> ', err);
    } 
});

