"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SortType = exports.DateType = void 0;
var DateType;
exports.DateType = DateType;

(function (DateType) {
  DateType[DateType["OrderGenerationTime"] = 1] = "OrderGenerationTime";
  DateType[DateType["OrderPaymentTime"] = 2] = "OrderPaymentTime";
  DateType[DateType["OrderShippingTime"] = 3] = "OrderShippingTime";
  DateType[DateType["OrderReceivingTime"] = 4] = "OrderReceivingTime";
  DateType[DateType["OrderUpdateTime"] = 5] = "OrderUpdateTime";
})(DateType || (exports.DateType = DateType = {}));

var SortType;
exports.SortType = SortType;

(function (SortType) {
  SortType[SortType["ReverseOrder"] = 0] = "ReverseOrder";
  SortType[SortType["AscendingOrder"] = 1] = "AscendingOrder";
})(SortType || (exports.SortType = SortType = {}));