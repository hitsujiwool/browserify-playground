
/*
 * src/leak.js
 */

window.foo = function() {
  console.log('this is foo');
};

window.baz = function() {
  console.log('this is bar');
};

(function(exports) {

  exports.bar = function() {
    console.log('this is baz');
  };
  
})(window);

