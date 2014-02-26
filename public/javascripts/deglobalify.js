(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

/*
 * src/leak.js
 */

exports.foo = function() {
  console.log('this is foo')
};

window.baz = function() {
  console.log('this is bar');
};

(function(exports) {

  exports.bar = function() {
    console.log('this is baz');
  };
  
})(window);


},{}],2:[function(require,module,exports){

/*
 * src/deglobalify.js
 */

var leak = require('../public/javascripts/leak');

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

},{"../public/javascripts/leak":1}]},{},[2])