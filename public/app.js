/* globals $, AndroidClient */
$(function() {
	'use strict';

	var ZOOM = 2;
	var autoUpdate = true;
	var client = new AndroidClient();
	client.setZoom(ZOOM);

	var screenElement = $('#screen');
	var toggleAutoUpdateElement = $('#toggle-auto-update');

	toggleAutoUpdateElement.on('click', toggleAutoUpdate);

	screenElement.on('contextmenu', rightClickReload);
	screenElement.on('mousedown', mouseDown);
	screenElement.on('mouseup', mouseUp);

	var swipeStart = null;

	function mouseDown(event) {
		if (event.ctrlKey && event.which === 1) {
			swipeStart = {
				point: getEventCoordinates(event),
				time: new Date()
			};
		}
	}

	function mouseUp(event) {
		if (event.which !== 1) return;

		var point = getEventCoordinates(event);

		if (null === swipeStart) {
			return sendClick(point);
		}

		var duration = new Date();
		duration -= swipeStart.time;

		sendSwipe(swipeStart.point, point, duration);
		swipeStart = null;
	}

	function sendSwipe(start, end, duration) {
		client.swipe(start, end, duration).then(function() {
			if (autoUpdate) {
				updateScreen();
			}
		});
	}

	function sendClick(point) {
		client.tap(point).then(function() {
			if (autoUpdate) {
				updateScreen();
			}
		});
	}

	function getEventCoordinates(event) {
		var _ = screenElement.offset(),
			offset = [_.left, _.top],
			coord = [event.pageX, event.pageY];

		return {
			x: ~~(coord[0] - offset[0]),
			y: ~~(coord[1] - offset[1])
		};
	}

	function rightClickReload(event) {
		event.preventDefault();
		updateScreen();
	}

	function toggleAutoUpdate() {
		autoUpdate = !autoUpdate;
		toggleAutoUpdateElement.attr('checked', autoUpdate);
		console.log('autoupdate', autoUpdate);
	}

	function updateScreen() {
		var now = (new Date()).getTime();
		screenElement.css('background-image', 'url(/capture.png?' + now + ')');
	}

	updateScreen();
});
