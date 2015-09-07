(function(factory) {
	'use strict';
	if (typeof module !== 'undefined' && module.exports) {
		factory(module.exports);
	} else {
		factory(window.utils = {});
	}
})(function factory(global) {
	'use strict';
	global.debounce = debounce;
	global.inherits = inherits;

	/**
	 * @param {Function} NewClass
	 * @param {Function} SuperClass
	 *
	 * @example
	 *   function Foo() {}
	 *   function Bar() { Foo.call(this); }
	 *   inherits(Bar, Foo);
	 */
	function inherits(NewClass, SuperClass, attributes) {
		var prototype = SuperClass.prototype,
			childPrototype = Object.create(prototype);

		if (attributes) {
			Object.keys(attributes).forEach(function(key) {
				childPrototype[key] = attributes[key];
			});
		}

		childPrototype.__super__ = SuperClass.prototype;
		NewClass.prototype = childPrototype;
		NewClass.prototype.constructor = NewClass;
	}

	function debounce(fn, delay, self) {
		var timer = null;

		return function() {
			var context = self || this,
				args = arguments;

			clearTimeout(timer);

			timer = setTimeout(function() {
				fn.apply(context, args);
			}, delay);
		};
	}
});
