'use strict';

var http = require('http');
var fs = require('fs');
var ecstatic = require('ecstatic');
var PORT = process.env.PORT || 80;
var waterfall = require('run-waterfall');
var AndroidServer = require('./server/AndroidServer').AndroidServer;
var droidServer = new AndroidServer();

http.createServer(handleRequest).listen(PORT);

var serveStatic = ecstatic({
	handleError: false,
	root: __dirname + '/client'
});

var serveIndex = function(request, response, next) {
	if (request.url === '/' || request.url === '') {
		fs.createReadStream('client/index.html').pipe(bundle.response);
		return;
	}

	next(null);
};

function handleRequest(request, response, cb) {
	waterfall([
		function(next) {
			droidServer.dispatch(request, response, next);
		},

		function(_, next) {
			serveStatic(request, response, next);
		},

		function(_, next) {
			serveIndex(request, response, next);
		},

		function(_, next) {
			response.writeHead(404);
			response.end();
			next(null);
		}
	], function () {
		cb();
	});
}

console.log('Listening on ' + PORT);
