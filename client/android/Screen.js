(function() {
	'use strict';
	/* jshint validthis: true */
	var Android = window.Android || (window.Android = {});

	function Screen(rootElement) {
		this.$ = rootElement;
		initialize(this);
	}

	Screen.prototype = {
		constructor: Screen,
		refresh: refresh,
		capture: capture,
		setSource: setSource,
		setSize: setSize,
		getSize: getSize,
		getZoom: getZoom,
		getCanvas: getCanvas
	};

	function initialize(self) {
		self._canvas = document.createElement('canvas');
		self._zoom = {
			x: 1,
			y: 1
		};
		self.$.appendChild(self._canvas);
	}

	function setSize(width, height) {
		this._size = {
			width: width,
			height: height
		};

		this._canvas.width = width;
		this._canvas.height = height;

		this.refresh();
	}

	function getSize() {
		return this._size;
	}

	function getZoom() {
		return this._zoom;
	}

	function getCanvas() {
		return this._canvas;
	}

	function setSource(url) {
		this._source = url;
	}

	function refresh() {
		if (!this._source) {
			throw new Error('Source not defined');
		}

		var self = this;

		capture(this._source).then(function(image) {
			updateZoom(self, image);
			drawImage(self, image);
		});
	}

	function capture(source) {
		return new Promise(function(resolve, reject) {
			var image = new Image();

			image.onload = function() {
				resolve(image);
			};

			image.onerror = function(error) {
				reject(error);
			};

			image.src = source + '?' + Number(new Date()).toString();
		});
	}

	function drawImage(self, image) {
		var size = self.getSize();
		var context = self.getCanvas().getContext('2d');

		context.drawImage(image, 0, 0, size.width, size.height);
	}

	function updateZoom(self, image) {
		var size = self.getSize();

		var realSize = {
			width: image.width || 1,
			height: image.height || 1
		};

		self._zoom = {
			x: size.width / realSize.width,
			y: size.height / realSize.height
		};
	}

	Android.Screen = Screen;
})();
