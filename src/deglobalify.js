
var leak = require('../public/javascripts/leak', ['foo', 'bar']);

leak.foo();
leak.bar();
leak.baz(); // this will cause error
