
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var fs = require('fs');
var path = require('path');
var marked = require('marked');
var async = require('async');
var browserify = require('browserify');

/**
 * Transforms.
 */

var exposify = require('exposify');
var deglobalify = require('deglobalify');
var deamdify = require('deamdify');
var debowerify = require('debowerify');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

function compile(md) {
  return marked("```javascript\n" + md + "\n```");
}

function handle(src, cb, options) {
  options = options || {};
  if (typeof cb === 'object') {
    options = cb;
    cb = null;
  }
  var view = options.view  || 'common';
  return function(req, res) {
    var b = browserify();
    var target = path.join(__dirname, 'public', 'javascripts', src);
    var files = [target];
    if (options.exports) {
      b.require(path.join(__dirname, 'src', src));
    } else {
      b.add(path.join(__dirname, 'src', src));
    }
    cb && cb(b);
    b.on('file', function(file) {
      files.push(file);
    });
    b.bundle()
      .pipe(fs.createWriteStream(target))
      .on('finish', function() {
        async.map(files, function(file, cb) { fs.readFile(file, { encoding: 'utf8' }, cb); }, function(err, results) {
          var compiled = results.map(function(body, i) {
            return { name: path.relative(__dirname, files[i]), body: compile(body) };
          });
          var output = compiled.shift();
          res.render(view, { title: src, inputs: compiled, output: output, script: src });
        });
    });
  };
}


app.get('/', function(req, res) {
  res.render('index', { title: 'browserify-playground' });
});

app.get('/personal', handle('personal.js'));
app.get('/built-in', handle('built_in.js'));
app.get('/empty', handle('empty.js'));
app.get('/npm', handle('npm.js'));
app.get('/exported', handle('exported.js', { exports: true }));

app.get('/deglobalify', handle('deglobalify.js', function(b) {
  b.transform(deglobalify);
}, { view: 'deglobalify' }));

app.get('/exposify', handle('exposify.js', function(b) {
  exposify.config = { leakedFoo: 'foo', leakedBar: 'bar', leakedBaz: 'baz' };
  b.transform(exposify);
}, { view: 'exposify' }));

app.get('/deamdify', handle('deamdify.js', function(b) {
  b.transform(deamdify);
}));

app.get('/debowerify', handle('debowerify.js', function(b) {
  b.transform(debowerify);
}, { view: 'debowerify' }));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

