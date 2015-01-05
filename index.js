// Generated by CoffeeScript 1.7.1
(function() {
  var Promise, checkURL, request;

  Promise = require('bluebird');

  request = Promise.promisifyAll(require('request'));

  exports.checkURL = checkURL = function(options) {
    if (typeof options === 'string') {
      options = {
        url: options
      };
    }
    if (options.timeout == null) {
      options.timeout = 10000;
    }
    if (options.gzip == null) {
      options.gzip = true;
    }
    return request.getAsync(options).spread(function(response) {
      var _ref;
      return (_ref = response.statusCode) === 200 || _ref === 304;
    })["catch"](function(e) {
      return false;
    });
  };

  exports.monitorURL = function(options, fn) {
    var connectivityState, interval, _check;
    interval = (options != null ? options.interval : void 0) || 0;
    connectivityState = null;
    _check = function() {
      return checkURL(options).then(function(connected) {
        if (connected === connectivityState) {
          return;
        }
        connectivityState = connected;
        fn(connected);
      })["finally"](function() {
        return setTimeout(_check, interval);
      });
    };
    return _check();
  };

}).call(this);
