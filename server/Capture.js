'use strict';

var spawn = require('child_process').spawn;
var fs = require('fs');

function getImage () {
	var pipe = spawn('sh', [__dirname + '/capture.sh'], { cwd: './', env: process.env});
	
	return pipe.stdout;
}

module.exports = {
	getImage: getImage
};