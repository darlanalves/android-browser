/* globals $ */
$(function() {
	'use strict';

	var autoUpdate = true;

	var screenElement = $('#screen');
	var canvasElement = document.getElementById('canvas');
	var inputElement = $('#input-events');
	var toggleAutoUpdateElement = $('#toggle-auto-update');

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
		if (autoUpdate) {
			display.refresh();
		}
	}

	toggleAutoUpdateElement.on('click', toggleAutoUpdate);
	inputElement.on('keydown', keyDown);

	function keyDown(event) {
		event.preventDefault();
		client.sendKey(event.keyCode).then(updateOnSuccess);
	}

	function toggleAutoUpdate() {
		autoUpdate = !autoUpdate;
		toggleAutoUpdateElement.attr('checked', autoUpdate);
	}

	function getRealCoordinates(point, zoom) {
		return {
			x: point.x / zoom.x,
			y: point.y / zoom.y
		};
	}
});
