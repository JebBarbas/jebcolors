"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.layer8Error = exports.internalError = exports.couldntParseError = exports.invalidCodeOrNameError = void 0;
var ColorError = /** @class */ (function (_super) {
    __extends(ColorError, _super);
    function ColorError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ColorError;
}(Error));
var Layer8Error = /** @class */ (function (_super) {
    __extends(Layer8Error, _super);
    function Layer8Error() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Layer8Error;
}(Error));
var invalidCodeOrNameError = function (con, identificator) { return new ColorError("The given code or name isn't a valid hexadecimal code or a valid css color name: " + con + ". Module 'jebcolors' trying to do: " + identificator); };
exports.invalidCodeOrNameError = invalidCodeOrNameError;
var couldntParseError = function (con, trying, identificator) { return new ColorError("Couldn't parse the hexadecimal code or css color name: " + con + ", trying to parse to: " + trying + ". Module 'jebcolors' trying to do " + identificator); };
exports.couldntParseError = couldntParseError;
var internalError = function (identificator) { return new ColorError("An internal error in module 'jebcolors' happened, this is usually an error in the package code. Trying to do: " + identificator); };
exports.internalError = internalError;
var layer8Error = function (whatBad) { return new Layer8Error("The developer made a mistake that ended in an error: " + whatBad); };
exports.layer8Error = layer8Error;
//# sourceMappingURL=errors.js.map