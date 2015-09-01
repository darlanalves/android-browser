'use strict';

var http = require('http');
var fs = require('fs');
var ecstatic = require('ecstatic');
var PORT = process.env.PORT || 80;
var waterfall = require('run-waterfall');
var AndroidServer = require('./server/AndroidServer').AndroidServer;
var droidServer = new AndroidServer();

http.createServer(handleRequest).listen(PORT);

var serveClient = ecstatic({
	handleError: false,
	root: __dirname + '/client'
});

var serveShared = ecstatic({
	handleError: false,
	root: __dirname + '/shared'
});

var serveIndex = function(request, response, next) {
	if (request.url === '/' || request.url === '') {
		fs.createReadStream('client/index.html').pipe(response);
		return;
	}

	next(null);
};

function handleRequest(request, response, cb) {
	waterfall([
		function(next) {
			droidServer.dispatch(request, response, next);
		},

		function(next) {
			serveClient(request, response, next);
		},

		function(next) {
			serveShared(request, response, next);
		},

		function(next) {
			serveIndex(request, response, next);
		},

		function(next) {
			response.writeHead(404);
			response.end();
			next(new Error('Not found'));
		}
	], cb);
}

console.log('Listening on ' + PORT);
