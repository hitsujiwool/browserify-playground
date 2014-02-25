
/*
 * src/built_in.js
 */

var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();

emitter.on('foo', function(message) {
  console.log(message);
});

emitter.emit('foo', 'some message');
