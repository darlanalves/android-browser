'use strict';

var spawn = require('child_process').spawn;
var cmd = "adb shell screencap -p | sed 's/\r$//'";

function getImage () {
	var pipe = spawn('sh', [__dirname + '/capture.sh'], { cwd: './', env: process.env});
	return pipe.stdout;
}

module.exports = {
	getImage: getImage
};