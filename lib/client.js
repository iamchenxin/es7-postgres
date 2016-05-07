'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('./util');

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
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(sqlCommand, params) {
        var _this = this;

        var rowHandle, pgCommand;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                (0, _util.devError)(sqlCommand.text == null, 'ClientWrapper.query only accept sqlCommand' + ('return from SQL tagged template,but the input is [' + sqlCommand + ']'));

                rowHandle = void 0;

                if (params) {
                  /*    // set N|name => name, V|values => values;
                        params.assign = multiAssign;
                        params.assign('V','values').to(sqlCommand,'values');
                        params.assign('N','name').to(sqlCommand,'name');
                  */
                  // fast set ~ N|name => name, V|values => values;
                  params.name && (sqlCommand.name = params.name);
                  params.N && (sqlCommand.name = params.N);
                  params.values && (sqlCommand.values = params.values);
                  params.V && (sqlCommand.values = params.V);

                  rowHandle = params.rowHandle;
                }

                pgCommand = sqlCommand;
                // if there is no values in sqlCommand
                // just set pgCommand passed to pg to string. for fast speed?

                if (sqlCommand.values == null || sqlCommand.values == []) {
                  pgCommand = sqlCommand.text;
                }

                if (!rowHandle) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt('return', new Promise(function (resolve, reject) {
                  var query = _this.client.query(pgCommand);
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

              case 9:
                return _context.abrupt('return', new Promise(function (resolve, reject) {
                  _this.client.query(pgCommand, function (err, result) {
                    _this.done();
                    if (err) {
                      reject('[ClientWrapper.query]: ' + err);
                    } else {
                      resolve(result);
                    }
                  });
                }));

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function query(_x, _x2) {
        return ref.apply(this, arguments);
      }

      return query;
    }()
  }]);

  return ClientWrapper;
}();

exports.default = ClientWrapper;
//# sourceMappingURL=client.js.map
