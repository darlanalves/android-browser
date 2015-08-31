/* globals $ */
(function(global) {
	'use strict';

	function AndroidClient() {}

	AndroidClient.prototype.swipe = function(start, end, duration) {
		start = getRealCoordinates(start, this.zoom);
		end = getRealCoordinates(end, this.zoom);

		var params = {
			x1: start.x,
			x2: end.x,
			y1: start.y,
			y2: end.y,
			duration: duration || 0
		};

		return new Promise(function(resolve, reject) {
			$.get('/action/swipe', params)
				.success(function(response) {
					console.log('swipe', start, end, duration);
					resolve(response);
				})
				.error(function(reason) {
					console.log('swipe error', reason);
					reject(reason);
				});
		});
	};

	AndroidClient.prototype.tap = function(point) {
		var realPoint = getRealCoordinates(point, this.zoom);

		return new Promise(function(resolve, reject) {
			$.get('/action/tap', realPoint)
				.success(function() {
					console.log('tap', point);
					resolve();
				})
				.error(function(reason) {
					console.log('tap error', reason);
					reject(reason);
				});
		});
	};

	AndroidClient.prototype.setZoom = function(factor) {
		this.zoom = factor || 1;
	};

	function getRealCoordinates(point, zoom) {
		return {
			x: point.x * zoom,
			y: point.y * zoom
		};
	}

	global.AndroidClient = AndroidClient;
})(this);
