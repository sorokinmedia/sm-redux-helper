'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var dist = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', { value: true });

function insertIntoStr(str, pos, toIn) {
	return str.substr(0, pos) + toIn + str.substr(pos, str.length);
}

function replaceInStr(str, begin, start, subj) {
	return str.slice(0, begin) + subj + str.slice(start, str.length);
}

function stripTags(str) {
	return str.replace(/<[^>]*>/gi, '');
}

function parseAllATags(str) {
	var res = str.match(/<a href=[^>]+>(.+?)<\/a>/g);
	return res ? res : [];
}

function stripATags(str) {
	return str.replace(/<a[^>]*>/gi, '').replace(/<[^>]*a>/gi, '');
}

function buildUrlSearch(params) {
	if (!params) return '';

	var res = Object.keys(params).reduce(function (acc, key) {
		return params[key] || params[key] === 0 ? acc + (!acc ? '' : '&') + (key + '=' + params[key]) : acc;
	}, '');
	return res ? '?' + res : '';
}

function buildUrlSearchForArray(arr, arrName) {
	return arr.reduce(function (acc, elem) {
		return acc + (acc ? '&' : '') + (arrName + '[]=' + elem);
	}, '');
}

exports.insertIntoStr = insertIntoStr;
exports.replaceInStr = replaceInStr;
exports.stripTags = stripTags;
exports.parseAllATags = parseAllATags;
exports.stripATags = stripATags;
exports.buildUrlSearch = buildUrlSearch;
exports.buildUrlSearchForArray = buildUrlSearchForArray;
});

unwrapExports(dist);
var dist_1 = dist.insertIntoStr;
var dist_2 = dist.replaceInStr;
var dist_3 = dist.stripTags;
var dist_4 = dist.parseAllATags;
var dist_5 = dist.stripATags;
var dist_6 = dist.buildUrlSearch;
var dist_7 = dist.buildUrlSearchForArray;

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var URL = 'URL',
    FAIL = 'FAIL',
    SUCCESS = 'SUCCESS',
    START = 'START';

var bypassReducer = function bypassReducer(baseType) {
	var savePrevData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	return function () {
		var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		var action = arguments[1];
		var type = action.type,
		    response = action.response,
		    error = action.error;

		var prevData = savePrevData && data;

		switch (type) {
			case baseType + START:
				return _extends({}, prevData, { loading: true });
			case baseType + SUCCESS:
				return response;
			case baseType + FAIL:
				return _extends({}, prevData, {
					error: error
				});
		}

		return data;
	};
};

var bypassAction = function bypassAction(type, url, callType, payload, params) {
	var auth = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;

	return function () {
		var _ref;

		return _ref = {
			type: type
		}, defineProperty(_ref, callType, URL + url + dist_6(params)), defineProperty(_ref, 'need_auth_token', auth), defineProperty(_ref, 'payload', payload), defineProperty(_ref, 'queryData', payload), _ref;
	};
};

exports.URL = URL;
exports.FAIL = FAIL;
exports.SUCCESS = SUCCESS;
exports.START = START;
exports.bypassReducer = bypassReducer;
exports.bypassAction = bypassAction;
