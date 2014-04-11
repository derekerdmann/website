
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var fs = require("fs");
var logger = require("morgan");
var errorhandler = require("errorhandler");

var Metalsmith = require("metalsmith");
var sass = require("metalsmith-sass");
var ignore = require("metalsmith-ignore");
var watch = require('metalsmith-watch');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'build')));

// development only
if ('development' == app.get('env')) {
  app.use(errorhandler());
}

// Generate metalsmith content
var ms = Metalsmith(__dirname);
ms.use( ignore( ".*" ) );  // ignore temp files
ms.use( sass({ outputStyle: "expanded" }) )

// Allow automatic rebuilds
if (process.argv.indexOf( "--watch" ) > -1 ) {
    ms.use(watch)
}

ms.build(function(err){ if (err) throw err; });

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
