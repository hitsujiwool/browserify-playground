
window.foo = function() {
  console.log('globally defined function');
};

this.bar = function() {
  console.log('globally defined function, too');
};

window.baz = function() {
  console.log('not executed');
};
