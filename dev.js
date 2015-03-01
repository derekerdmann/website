
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var fs = require("fs");
var logger = require("morgan");
var errorhandler = require("errorhandler");

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
console.log("__dirname: " + __dirname );
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(errorhandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
