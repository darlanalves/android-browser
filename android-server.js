'use strict';

var http = require('http');
var fs = require('fs');
var ecstatic = require('ecstatic');
var PORT = process.env.PORT || 80;

var Capture = require('./server/Capture');
var Events = require('./server/Events');
var URLParser = require('./server/URLParser');

http.createServer(handleRequest).listen(PORT);

function handleRequest(request, response) {
	var servePublic = ecstatic({
		handleError: false,
		root: __dirname + '/client'
	});

	var serveApi = function(request, response, next) {
		var urlInfo = URLParser.parse(request.url);

		if (request.url === '/' || request.url === '') {
			fs.createReadStream('client/index.html').pipe(response);
			return;
		}

		// console.log(urlInfo);
		if (urlInfo.parts.hostname === 'capture.png') {
			response.writeHead(200, {
				contentType: 'image/png',
				cacheControl: 'maxage=0'
			});

			Capture.getImage().pipe(response);
			return;
		}

		var options = urlInfo.options;

		if (urlInfo.parts.hostname === 'action/tap') {
			var x = Number(options.x) || 0,
				y = Number(options.y) || 0;

			Events.tap(x, y).pipe(response);
			return;
		}

		if (urlInfo.parts.hostname === 'action/swipe') {
			var x1 = Number(options.x1) || 0,
				y1 = Number(options.y1) || 0,
				x2 = Number(options.x2) || 0,
				y2 = Number(options.y2) || 0,
				duration = Number(options.duration) || 0;

			Events.swipe(x1, y1, x2, y2, duration).pipe(response);
			return;
		}

		next();
	};

	serveApi(request, response, function() {
		servePublic(request, response, function() {
			response.writeHead(404);
			response.end();
		});
	});
}

console.log('Listening on ' + PORT);
