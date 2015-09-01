'use strict';

var spawn = require('child_process').spawn;
var KeyMapper = require('./KeyMapper');
var stream = require('stream');

function sendKey(key) {
	var nativeCode = KeyMapper.toNative(key);

	if (nativeCode === -1) {
		return createErrorStream('Invalid key code');
	}

	// input keyevent xx
	return runCommand('input', 'keyevent', nativeCode);
}

function sendText(sequence) {
	if (sequence.indexOf(' ') !== -1) {
		// input text abc
		return runCommand('input', 'text', sequence);
	}
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

function createErrorStream (message) {
	var error = new stream.Readable();

	error._read = function noop() {};
	error.push(message);
	error.push(null);

	return error;
}

module.exports = {
	tap: tap,
	sendKey: sendKey,
	swipe: swipe
};
