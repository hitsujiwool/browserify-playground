
/*
 * src/foo.js
 */

var bar = require('./bar');

module.exports = function() {
  console.log('this is foo');
  bar();
};
