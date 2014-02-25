
/*
 * src/npm.js
 */

var request = require('superagent');

request.get('http://localhost:3000', function(res) {
  console.log(res.status);
});
