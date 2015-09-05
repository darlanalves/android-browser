/* globals $ */
$(function() {
	'use strict';

	var options = {
		autoUpdate: true,
		rawKeyboard: false
	};

	var screenElement = $('#screen');
	var canvasElement = document.getElementById('canvas');
	var inputElement = $('#input-events');

	makeOptionToggle('#toggle-auto-update', 'autoUpdate');
	makeOptionToggle('#toggle-keyboard', 'rawKeyboard');

	var client = new window.Android.Client();
	var display = new window.Android.Screen(canvasElement);
	var touch = new window.Android.TouchArea(screenElement);

	display.setSource('/capture.png');
	display.setSize(360, 640);

	touch.on('swipe', sendSwipe);
	touch.on('tap', sendTap);
	touch.on('update', function() {
		display.refresh();
	});

	function sendSwipe(start, end, duration) {
		var zoom = display.getZoom();
		start = getRealCoordinates(start, zoom);
		end = getRealCoordinates(end, zoom);

		client.swipe(start, end, duration).then(updateOnSuccess);
	}

	function sendTap(point) {
		var zoom = display.getZoom();
		point = getRealCoordinates(point, zoom);

		client.tap(point).then(updateOnSuccess);
	}

	function updateOnSuccess() {
		if (options.autoUpdate) {
			display.refresh();
		}
	}

	inputElement.on('keydown', keyDown);

	function keyDown(event) {
		if (options.rawKeyboard) {
			event.preventDefault();
			client.sendKey(event.keyCode).then(updateOnSuccess);
			return;
		}

		// Enter
		if (event.keyCode === 13) {
			event.preventDefault();

			var text = inputElement.val();

			if (text === '') {
				client.sendKey(13).then(updateOnSuccess);
				return;
			}

			client.sendText(text).then(function() {
				inputElement.val('');
				updateOnSuccess();
			});
		}
	}

	function getRealCoordinates(point, zoom) {
		return {
			x: point.x / zoom.x,
			y: point.y / zoom.y
		};
	}

	function makeOptionToggle(selector, optionName) {
		var element = $(selector);

		element.attr('checked', Boolean(options[optionName]));
		element.on('click', toggle);

		function toggle() {
			options[optionName] = Boolean(element.attr('checked'));
		}
	}
});
