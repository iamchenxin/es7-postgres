'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// function inside a class must be arrow function!
// for binding this to the class

var ClientWrapper = function () {
  function ClientWrapper(client, done) {
    _classCallCheck(this, ClientWrapper);

    this.client = client;
    this.done = done;
  }

  _createClass(ClientWrapper, [{
    key: 'query',
    value: function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(queryString) {
        var _this = this;

        var params = arguments.length <= 1 || arguments[1] === undefined ? undefined : arguments[1];
        var rowHandle = arguments[2];
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!rowHandle) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt('return', new Promise(function (resolve, reject) {
                  var query = _this.client.query(queryString, params);
                  query.on('row', rowHandle);
                  query.on('error', function (error) {
                    _this.done();
                    reject('[ClientWrapper.query]: ' + error);
                  });
                  query.on('end', function (result) {
                    _this.done();
                    resolve(result);
                  });
                }));

              case 4:
                return _context.abrupt('return', new Promise(function (resolve, reject) {
                  _this.client.query(queryString, params, function (err, result) {
                    _this.done();
                    if (err) {
                      reject('[ClientWrapper.query]: ' + err);
                    } else {
                      resolve(result);
                    }
                  });
                }));

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function query(_x, _x2, _x3) {
        return ref.apply(this, arguments);
      }

      return query;
    }()
  }]);

  return ClientWrapper;
}();

var pg_wrapper = {
  pg: _pg2.default,
  connect: function connect(conString) {
    var _this2 = this;

    return _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt('return', new Promise(function (resolve, reject) {
                _pg2.default.connect(conString, function (err, client, done) {
                  if (err) {
                    reject('[pg.connect]: ' + err);
                  }
                  var clientWrapper = new ClientWrapper(client, done);
                  resolve(clientWrapper);
                });
              }));

            case 1:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    }))();
  }
};

exports.default = pg_wrapper;
//# sourceMappingURL=pg-wrapper.js.map
