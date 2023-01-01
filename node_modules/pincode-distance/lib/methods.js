"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.calculategeoDistance = exports.toRad = void 0;

var _pincode = _interopRequireDefault(require("./pincode"));

var _manualDistance = _interopRequireDefault(require("./manualDistance"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var toRad = function toRad(value) {
  var RADIANT_CONSTANT = 0.0174532925199433;
  return value * RADIANT_CONSTANT;
};
/**
 * [calculategeoDistance calculates the distance in metres between two geocoords]
 * @author  Saurav
 * @version [version]
 * @date    2016-03-10
 * @param   {[type]}   start [description]
 * @param   {[type]}   end   [description]
 * @return  {[type]}            [description]
 */


exports.toRad = toRad;

var calculategeoDistance = function calculategeoDistance(start, end) {
  var KM_RATIO = 6371;

  try {
    var dLat = toRad(end.lat - start.lat);
    var dLon = toRad(end.lng - start.lng);
    var lat1Rad = toRad(start.lat);
    var lat2Rad = toRad(end.lat);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var dMtrs = KM_RATIO * c;
    return dMtrs;
  } catch (e) {
    return -1;
  }
};

exports.calculategeoDistance = calculategeoDistance;

var PincodeDistance =
/*#__PURE__*/
function () {
  function PincodeDistance() {
    _classCallCheck(this, PincodeDistance);

    this.codes = _pincode["default"];
  }

  _createClass(PincodeDistance, [{
    key: "getlatLng",
    value: function getlatLng(pincode) {
      return this.codes[pincode];
    }
  }, {
    key: "getDistance",
    value: function getDistance(toPincode, fromPincode) {
      var distance = 1;
      var doesExist = _manualDistance["default"][toPincode];

      if (doesExist && doesExist[fromPincode]) {
        distance = doesExist[fromPincode];
      } else {
        var toCoords = this.getlatLng(toPincode);
        var fromCoords = this.getlatLng(fromPincode);
        distance = calculategeoDistance(toCoords, fromCoords);

        if (toPincode === fromPincode) {
          distance = 1;
        }
      }

      return distance;
    }
  }]);

  return PincodeDistance;
}();

var _default = PincodeDistance;
exports["default"] = _default;
//# sourceMappingURL=methods.js.map