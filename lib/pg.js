'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pgWrapper = undefined;

var _client = require('./client.js');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var pg = require('pg');

var pgWrapper = {
  pg: pg,
  connect: function connect(conString) {
    var _this = this;

    return _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt('return', new Promise(function (resolve, reject) {
                pg.connect(conString, function (err, client, done) {
                  console.log('not called');
                  if (err) {
                    reject('[pg.connect]: ' + err);
                  }
                  var clientWrapper = new _client2.default(client, done);
                  resolve(clientWrapper);
                });
              }));

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  }
};

exports.pgWrapper = pgWrapper;
//# sourceMappingURL=pg.js.map
