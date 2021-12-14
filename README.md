# revenueLabs

It is a small application that fetch data in json format form external api. The data is handled internally by a rest full api in NodeJS and Express framework and SQL in cloud with MySQL database and front is Angular-13 app.

### Description

This is a technical test that consists of two parts, the creation of a small app and the code review.

## revenueLabs App

It possible to run this app locally with in project or with docker compose. For this clone the code form github or download the zip. It is necessary to have installed NodeJS(+12), AngularCLI, Git. Optionally Docker.

#### Navigate to the folder:

- `$ cd revenueLabs`

#### Within the folder run the following command:

- `revenueLabs/$ docker-compose build`
- `revenueLabs/$ docker-compose up`

#### Ones is done, in browser navigate to http://localhost:4200/ or http://localhost:3000/api-docs/ to interact with swagger.

### revenueLabs_back

After clone the repository or download to run the app locally with npm o run test.

#### Navigate to the folder of revenueLabs_back in revenueLabs, instal dependencies from npm, run the test with script or star the server:

- ` $ revenueLabs/ cd revenueLabs_back`
- `$ npm i`
- `$ npm run test`
- `$ npm run dev`

### revenueLabs_front

To run the front side with angular, it is necessary download the dependencies from npm and that the back en wil run in other terminal to get access.

#### Navigate to the folder of revenueLabs_front in revenueLabs, instal dependencies from npm, run ng command :

- ` $ revenueLabs/ cd revenueLabs_front`
- `$ npm i`
- `$ ng server -o`

## reviewCode

**Code review** :

The seconde parte, in the root of the project the **refactorCode.ts** file is my approche to refactor the code and try my best in clean code and coding.
