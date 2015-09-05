(function() {
	/* globals $ */
	'use strict';
	var Android = window.Android || (window.Android = {});

	function Client() {}

	Client.prototype.swipe = function(start, end, duration) {
		var params = {
			x1: start.x,
			x2: end.x,
			y1: start.y,
			y2: end.y,
			duration: duration || 0
		};

		return apiCall('/action/swipe', params);
	};

	Client.prototype.tap = function(point) {
		return apiCall('/action/tap', point);
	};

	Client.prototype.sendKey = function(keyCode) {
		var params = {
			key: keyCode
		};

		return apiCall('/action/key', params);
	};

	Client.prototype.sendText = function(text) {
		var params = {
			sequence: text
		};

		return apiCall('/action/key', params);
	};

	function apiCall(url, params) {
		return new Promise(function(resolve, reject) {
			$.get(url, params).success(resolve).error(reject);
		});
	}

	Android.Client = Client;
})();
