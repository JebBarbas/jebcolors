"use strict";
// Main module, only if you want to use the functions
exports.__esModule = true;
exports.rgbToHsl = exports.rgb = exports.normalizeHSLValue = exports.normalizeColorValue = exports.light = exports.isValidHexCode = exports.hslToRgb = exports.hsl = exports.getRedValue = exports.getGreenValue = exports.getBlueValue = exports.fixHexCode = exports.percentage = exports.normalize = exports.clean = void 0;
// Imports
var functions_1 = require("./functions");
exports.clean = functions_1.clean;
exports.normalize = functions_1.normalize;
exports.percentage = functions_1.percentage;
var color_functions_1 = require("./color-functions");
exports.fixHexCode = color_functions_1.fixHexCode;
exports.getBlueValue = color_functions_1.getBlueValue;
exports.getGreenValue = color_functions_1.getGreenValue;
exports.getRedValue = color_functions_1.getRedValue;
exports.hsl = color_functions_1.hsl;
exports.hslToRgb = color_functions_1.hslToRgb;
exports.isValidHexCode = color_functions_1.isValidHexCode;
exports.light = color_functions_1.light;
exports.normalizeColorValue = color_functions_1.normalizeColorValue;
exports.normalizeHSLValue = color_functions_1.normalizeHSLValue;
exports.rgb = color_functions_1.rgb;
exports.rgbToHsl = color_functions_1.rgbToHsl;
//# sourceMappingURL=index.js.map