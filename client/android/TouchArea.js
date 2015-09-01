(function() {
	/* globals EventEmitter */
	'use strict';
	var Android = window.Android || (window.Android = {});

	function TouchArea(el) {
		EventEmitter.call(this);
		this.swipeStart = null;

		if (el) {
			this.attach(el);
		}
	}

	var prototype = {
		detach: detach,
		attach: attach
	};

	window.utils.inherits(TouchArea, EventEmitter, prototype);

	function attach(element) {
		var self = this;

		self.$ = element;
		element.on('contextmenu', rightClickReload.bind(self));
		element.on('mousedown', mouseDown.bind(self));
		element.on('mouseup', mouseUp.bind(self));
	}

	function detach() {
		this.$.off('contextmenu mouseup mousedown');
	}

	function mouseDown(event) {
		// Ctrl + Left click OR Midlle Click
		var swipe = event.ctrlKey && event.which === 1 ||
			event.which === 2;

		if (swipe) {
			this.swipeStart = {
				point: getEventCoordinates(this.$, event),
				time: new Date()
			};
		}
	}

	function mouseUp(event) {
		if (event.which !== 1 && event.which !== 2) return;

		var point = getEventCoordinates(this.$, event);
		var start = this.swipeStart;

		if (null === start) {
			this.emit('tap', point);
			return;
		}

		var duration = new Date();
		duration -= start.time;

		this.emit('swipe', start.point, point, duration);
		this.swipeStart = null;
	}

	function getEventCoordinates(el, event) {
		var _ = el.offset(),
			offset = [_.left, _.top],
			coord = [event.pageX, event.pageY];

		return {
			x: ~~(coord[0] - offset[0]),
			y: ~~(coord[1] - offset[1])
		};
	}

	function rightClickReload(event) {
		event.preventDefault();
		this.emit('update');
	}


	Android.TouchArea = TouchArea;
})();
