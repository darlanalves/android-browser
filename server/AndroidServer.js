'use strict';

var Router = require('micro-router').Router;
var Capture = require('./Capture');
var Events = require('./Events');
var URLParser = require('./URLParser');

function AndroidServer() {
	this.router = new Router();
	initialize(this.router);
}

module.exports.AndroidServer = AndroidServer;

AndroidServer.prototype = {
	constructor: AndroidServer,
	dispatch: dispatch
};

function initialize(router) {
	router.when('/capture.png', actionCapture);
	router.when('/action/key', actionKey);
	router.when('/action/tap', actionTap);
	router.when('/action/swipe', actionSwipe);
}

function dispatch(request, response, next) {
	var url = URLParser.parse(request.url);
	var options = url.options;

	try {
		/* jshint validthis: true */
		this.router.match(url.parts.path, request, response, url, options);
	} catch (e) {
		next();
	}
}

function actionCapture(_, request, response) {
	response.writeHead(200, {
		contentType: 'image/png',
		cacheControl: 'maxage=0'
	});

	Capture.getImage().pipe(response);
	return;
}

function actionTap(_, request, response, url, options) {
	var x = Number(options.x) || 0,
		y = Number(options.y) || 0;

	Events.tap(x, y).pipe(response);
	return;
}

function actionSwipe(_, request, response, url, options) {
	var x1 = Number(options.x1) || 0,
		y1 = Number(options.y1) || 0,
		x2 = Number(options.x2) || 0,
		y2 = Number(options.y2) || 0,
		duration = Number(options.duration) || 0;

	Events.swipe(x1, y1, x2, y2, duration).pipe(response);
	return;
}

function actionKey(_, request, response, url, options) {
	var keyCode = Number(options.key) || 0,
		sequence = options.sequence || '';

	var result;

	if (sequence) {
		result = Events.sendText(sequence);
	} else {
		result = Events.sendKey(keyCode);
	}

	if (result instanceof Error) {
		response.writeHead(400);
		response.end(String(result));
		return;
	}

	result.pipe(response);
}
