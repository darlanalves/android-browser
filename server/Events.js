'use strict';

var spawn = require('child_process').spawn;

// http: //stackoverflow.com/questions/7789826/adb-shell-input-events
var AdbKeymap = {
	0: 'KEYCODE_0',
	1: 'KEYCODE_SOFT_LEFT',
	2: 'KEYCODE_SOFT_RIGHT',
	3: 'KEYCODE_HOME',
	4: 'KEYCODE_BACK',
	5: 'KEYCODE_CALL',
	6: 'KEYCODE_ENDCALL',
	7: 'KEYCODE_0',
	8: 'KEYCODE_1',
	9: 'KEYCODE_2',
	10: 'KEYCODE_3',
	11: 'KEYCODE_4',
	12: 'KEYCODE_5',
	13: 'KEYCODE_6',
	14: 'KEYCODE_7',
	15: 'KEYCODE_8',
	16: 'KEYCODE_9',
	17: 'KEYCODE_STAR',
	18: 'KEYCODE_POUND',
	19: 'KEYCODE_DPAD_UP',
	20: 'KEYCODE_DPAD_DOWN',
	21: 'KEYCODE_DPAD_LEFT',
	22: 'KEYCODE_DPAD_RIGHT',
	23: 'KEYCODE_DPAD_CENTER',
	24: 'KEYCODE_VOLUME_UP',
	25: 'KEYCODE_VOLUME_DOWN',
	26: 'KEYCODE_POWER',
	27: 'KEYCODE_CAMERA',
	28: 'KEYCODE_CLEAR',
	29: 'KEYCODE_A',
	54: 'KEYCODE_Z',
	55: 'KEYCODE_COMMA',
	56: 'KEYCODE_PERIOD',
	57: 'KEYCODE_ALT_LEFT',
	58: 'KEYCODE_ALT_RIGHT',
	59: 'KEYCODE_SHIFT_LEFT',
	60: 'KEYCODE_SHIFT_RIGHT',
	61: 'KEYCODE_TAB',
	62: 'KEYCODE_SPACE',
	63: 'KEYCODE_SYM',
	64: 'KEYCODE_EXPLORER',
	65: 'KEYCODE_ENVELOPE',
	66: 'KEYCODE_ENTER',
	67: 'KEYCODE_DEL',
	68: 'KEYCODE_GRAVE',
	69: 'KEYCODE_MINUS',
	70: 'KEYCODE_EQUALS',
	71: 'KEYCODE_LEFT_BRACKET',
	72: 'KEYCODE_RIGHT_BRACKET',
	73: 'KEYCODE_BACKSLASH',
	74: 'KEYCODE_SEMICOLON',
	75: 'KEYCODE_APOSTROPHE',
	76: 'KEYCODE_SLASH',
	77: 'KEYCODE_AT',
	78: 'KEYCODE_NUM',
	79: 'KEYCODE_HEADSETHOOK',
	80: 'KEYCODE_FOCUS',
	81: 'KEYCODE_PLUS',
	82: 'KEYCODE_MENU',
	83: 'KEYCODE_NOTIFICATION',
	84: 'KEYCODE_SEARCH',
	85: 'KEYCODE_MEDIA_PLAY_PAUSE',
	86: 'KEYCODE_MEDIA_STOP',
	87: 'KEYCODE_MEDIA_NEXT',
	88: 'KEYCODE_MEDIA_PREVIOUS',
	89: 'KEYCODE_MEDIA_REWIND',
	90: 'KEYCODE_MEDIA_FAST_FORWARD',
	91: 'KEYCODE_MUTE',
	92: 'KEYCODE_PAGE_UP',
	93: 'KEYCODE_PAGE_DOWN',
	94: 'KEYCODE_PICTSYMBOLS'
};

function sendKey(key) {
	// input keyevent 32
	return runCommand('input', 'keyevent', key);
}

function tap(x, y) {
	// input tap 500 1450
	return runCommand('input', 'tap', x, y);
}

function swipe(x1, y1, x2, y2, duration) {
	duration = duration || 100;
	// input swipe 100 500 100 1450 100
	return runCommand('input', 'swipe', x1, y1, x2, y2, duration);
}

function runCommand() {
	var args = ['shell'];
	args = args.concat(args.slice.call(arguments));

	// console.log('cmd', args);
	return spawn('adb', args, {
		cwd: './',
		env: process.env
	}).stdout;
}

module.exports = {
	tap: tap,
	sendKey: sendKey,
	swipe: swipe
};
