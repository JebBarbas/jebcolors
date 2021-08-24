"use strict";
// Main module to export the functions
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.validationRegex = exports.isValidHexCode = exports.isValid = exports.averageColor = exports.getRelativeLuminance = exports.contrastTest = exports.getRGB = exports.isDarkColor = exports.rgbToHsl = exports.rgb = exports.normalizeHSLValue = exports.normalizeColorValue = exports.light = exports.hslToRgb = exports.hsl = exports.getRedValue = exports.getGreenValue = exports.getBlueValue = exports.fixHexCode = exports.deg = exports.percentage = exports.clean = exports.normalize = void 0;
// Exports
var functions_1 = require("./functions");
__createBinding(exports, functions_1, "normalize");
__createBinding(exports, functions_1, "clean");
__createBinding(exports, functions_1, "percentage");
__createBinding(exports, functions_1, "deg");
var color_functions_1 = require("./color-functions");
__createBinding(exports, color_functions_1, "fixHexCode");
__createBinding(exports, color_functions_1, "getBlueValue");
__createBinding(exports, color_functions_1, "getGreenValue");
__createBinding(exports, color_functions_1, "getRedValue");
__createBinding(exports, color_functions_1, "hsl");
__createBinding(exports, color_functions_1, "hslToRgb");
__createBinding(exports, color_functions_1, "light");
__createBinding(exports, color_functions_1, "normalizeColorValue");
__createBinding(exports, color_functions_1, "normalizeHSLValue");
__createBinding(exports, color_functions_1, "rgb");
__createBinding(exports, color_functions_1, "rgbToHsl");
__createBinding(exports, color_functions_1, "isDarkColor");
__createBinding(exports, color_functions_1, "getRGB");
__createBinding(exports, color_functions_1, "contrastTest");
__createBinding(exports, color_functions_1, "getRelativeLuminance");
__createBinding(exports, color_functions_1, "averageColor");
var validation_functions_1 = require("./validation-functions");
__createBinding(exports, validation_functions_1, "isValid");
__createBinding(exports, validation_functions_1, "isValidHexCode");
__createBinding(exports, validation_functions_1, "validationRegex");
//# sourceMappingURL=index.js.map