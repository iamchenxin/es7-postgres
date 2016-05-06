'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function multiAssign() {
  var _this = this;

  for (var _len = arguments.length, srcKeyNames = Array(_len), _key = 0; _key < _len; _key++) {
    srcKeyNames[_key] = arguments[_key];
  }

  var rt = {
    to: function to(target, tarKeyName) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = srcKeyNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var name = _step.value;

          if (_this[name]) {
            target[tarKeyName] = _this[name];
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  };
  return rt;
}

function devError(condition, msg) {
  if (condition) {
    if (typeof msg == 'string') {
      throw new Error(msg);
    } else {
      throw msg;
    }
  }
}

exports.multiAssign = multiAssign;
exports.devError = devError;
//# sourceMappingURL=util.js.map
