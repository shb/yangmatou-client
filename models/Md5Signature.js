"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _md = _interopRequireDefault(require("md5"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Md5Signature = /*#__PURE__*/function () {
  function Md5Signature(conf) {
    _classCallCheck(this, Md5Signature);

    _defineProperty(this, "app_secret", void 0);

    this.app_secret = conf.appSecret;
  }

  _createClass(Md5Signature, [{
    key: "sign",
    value: function sign(request) {
      return _objectSpread({}, request, {
        sign: this.getHash("".concat(this.getQueryString(_objectSpread({}, request, {
          sign_method: 'MD5'
        })), "&app_secret=").concat(this.app_secret)),
        sign_method: 'MD5'
      });
    }
  }, {
    key: "getQueryString",
    value: function getQueryString(request) {
      return Object.entries(request).sort(function (a, b) {
        return a[0].localeCompare(b[0]);
      }).map(function (it) {
        return "".concat(it[0], "=").concat(it[1]);
      }).join('&');
    }
  }, {
    key: "getHash",
    value: function getHash(message) {
      return (0, _md["default"])(message).toUpperCase();
    }
  }, {
    key: "signMethod",
    get: function get() {
      return 'MD5';
    }
  }]);

  return Md5Signature;
}();

exports["default"] = Md5Signature;