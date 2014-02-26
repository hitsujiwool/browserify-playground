
/*
 * src/deglobalify.js
 */

var leak = require('../public/javascripts/leak', ['foo', 'bar']);

leak.foo();
try {
  leak.bar();
} catch (e) {
  console.log('errored bar');
}

try {
  leak.baz();
} catch (e) {
  console.log('errored baz');
}
