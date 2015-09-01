/* globals $, AndroidClient */
$(function() {
	'use strict';

	var ZOOM = 2;
	var autoUpdate = true;
	var client = new AndroidClient();
	client.setZoom(ZOOM);

	var screenElement = $('#screen');
	var inputElement = $('#input-events');
	var toggleAutoUpdateElement = $('#toggle-auto-update');

	toggleAutoUpdateElement.on('click', toggleAutoUpdate);

	screenElement.on('contextmenu', rightClickReload);
	screenElement.on('mousedown', mouseDown);
	screenElement.on('mouseup', mouseUp);

	inputElement.on('keydown', keyDown)

	var swipeStart = null;

	function mouseDown(event) {
		// Ctrl + Left click OR Midlle Click
		var swipe = event.ctrlKey && event.which === 1 ||
			event.which === 2;

		if (swipe) {
			swipeStart = {
				point: getEventCoordinates(event),
				time: new Date()
			};
		}
	}

	function mouseUp(event) {
		if (event.which !== 1 && event.which !== 2) return;

		var point = getEventCoordinates(event);

		if (null === swipeStart) {
			return sendClick(point);
		}

		var duration = new Date();
		duration -= swipeStart.time;

		sendSwipe(swipeStart.point, point, duration);
		swipeStart = null;
	}

	function keyDown (event) {
		event.preventDefault();
		client.sendKey(event.keyCode).then(updateOnSuccess);
	}

	function sendSwipe(start, end, duration) {
		client.swipe(start, end, duration).then(updateOnSuccess);
	}

	function sendClick(point) {
		client.tap(point).then(updateOnSuccess);
	}

	function updateOnSuccess () {
		if (autoUpdate) {
			updateScreen();
		}
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
