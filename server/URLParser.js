'use strict';

var URLParser = {};
var nodeUrl = require('url');
var queryString = require('query-string');

URLParser.parse = function parseUrl(url) {
	var params = extractURLParams(url);

	if (!params) return false;

	var urlData = nodeUrl.parse(params.url);
	urlData.slashes = true;

	// resolve www.domain.com to http://www.domain.com
	if (!urlData.protocol) {
		urlData.protocol = 'http:';
	}

	if (urlData.pathname && !urlData.hostname) {
		urlData.hostname = urlData.pathname;
		urlData.pathname = null;
	}

	return {
		url: nodeUrl.format(urlData),
		options: params.options,
		parts: urlData
	};
};

var URLmatcher = /\/([^\?]+)(?:\?(.+))?/;
var QSmatcher = /\/\?(.+)/;

function extractURLParams(URL) {
	var match, requestedUrl, options;

	URL = String(URL);

	match = URL.match(URLmatcher);

	if (match) {
		requestedUrl = decodeURIComponent(match[1]);
		options = match[2] ? queryString.parse(match[2]) : {};
	} else {
		match = URL.match(QSmatcher);

		if (match) {
			options = match[1] ? queryString.parse(match[1]) : {};
			requestedUrl = options.url;
		} else {
			return null;
		}
	}

	Object.keys(options).forEach(function(key) {
		if (options[key] === 'true') {
			options[key] = true;
		}

		if (options[key] === 'false') {
			options[key] = false;
		}
	});

	return {
		url: requestedUrl,
		options: options
	};
}

module.exports = URLParser;