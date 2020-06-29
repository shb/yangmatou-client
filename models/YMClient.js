"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var YMClient = /*#__PURE__*/function () {
  function YMClient(conf) {
    _classCallCheck(this, YMClient);

    _defineProperty(this, "app_id", void 0);

    _defineProperty(this, "auth_code", void 0);

    _defineProperty(this, "signature", void 0);

    this.app_id = conf.appId;
    this.auth_code = conf.authCode;
    this.signature = conf.signature;
  }

  _createClass(YMClient, [{
    key: "request",
    value: function request(method, bizContent) {
      var body = {
        auth_code: this.auth_code,
        biz_content: JSON.stringify(bizContent),
        nonce_str: this.getNonce(),
        sign_method: this.signature.signMethod,
        timestamp: this.getTimestamp()
      };
      var signedBody = this.signature.sign(_objectSpread({}, body, {
        app_id: this.app_id,
        method: method
      }));
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        url: "https://open.ymatou.com/apigateway/v1?app_id=".concat(this.app_id, "&method=").concat(method),
        data: _objectSpread({}, body, {
          sign: signedBody.sign
        })
      };
    }
  }, {
    key: "getNonce",
    value: function getNonce() {
      var nonce = '';

      for (var i = 0; i < 32; i++) {
        nonce += (Math.random() * 9).toFixed(0).toString();
      }

      return nonce;
    }
  }, {
    key: "getTimestamp",
    value: function getTimestamp() {
      return (0, _moment["default"])().utcOffset(8).format('YYYY-MM-DD HH:mm:ss');
    }
  }, {
    key: "appId",
    get: function get() {
      return this.app_id;
    }
  }]);

  return YMClient;
}();

exports["default"] = YMClient;