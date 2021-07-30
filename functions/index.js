"use strict";
// Main module, only if you want to use the functions
Object.defineProperty(exports, "__esModule", { value: true });
exports.rgbToHsl = exports.rgb = exports.normalizeHSLValue = exports.normalizeColorValue = exports.light = exports.isValidHexCode = exports.hslToRgb = exports.hsl = exports.getRedValue = exports.getGreenValue = exports.getBlueValue = exports.fixHexCode = exports.percentage = exports.normalize = exports.clean = void 0;
// Imports
var functions_1 = require("./functions");
Object.defineProperty(exports, "clean", { enumerable: true, get: function () { return functions_1.clean; } });
Object.defineProperty(exports, "normalize", { enumerable: true, get: function () { return functions_1.normalize; } });
Object.defineProperty(exports, "percentage", { enumerable: true, get: function () { return functions_1.percentage; } });
var color_functions_1 = require("./color-functions");
Object.defineProperty(exports, "fixHexCode", { enumerable: true, get: function () { return color_functions_1.fixHexCode; } });
Object.defineProperty(exports, "getBlueValue", { enumerable: true, get: function () { return color_functions_1.getBlueValue; } });
Object.defineProperty(exports, "getGreenValue", { enumerable: true, get: function () { return color_functions_1.getGreenValue; } });
Object.defineProperty(exports, "getRedValue", { enumerable: true, get: function () { return color_functions_1.getRedValue; } });
Object.defineProperty(exports, "hsl", { enumerable: true, get: function () { return color_functions_1.hsl; } });
Object.defineProperty(exports, "hslToRgb", { enumerable: true, get: function () { return color_functions_1.hslToRgb; } });
Object.defineProperty(exports, "isValidHexCode", { enumerable: true, get: function () { return color_functions_1.isValidHexCode; } });
Object.defineProperty(exports, "light", { enumerable: true, get: function () { return color_functions_1.light; } });
Object.defineProperty(exports, "normalizeColorValue", { enumerable: true, get: function () { return color_functions_1.normalizeColorValue; } });
Object.defineProperty(exports, "normalizeHSLValue", { enumerable: true, get: function () { return color_functions_1.normalizeHSLValue; } });
Object.defineProperty(exports, "rgb", { enumerable: true, get: function () { return color_functions_1.rgb; } });
Object.defineProperty(exports, "rgbToHsl", { enumerable: true, get: function () { return color_functions_1.rgbToHsl; } });
