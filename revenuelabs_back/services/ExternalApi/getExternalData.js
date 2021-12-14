'use strict';
const got = require('got/dist/source');

exports.getData = (url) => {
  return new Promise((resolve, reject) => {
    got(url)
    .then(res => resolve(JSON.parse(res.body)))
    .catch(error => reject(error.response.body));
  });

}
