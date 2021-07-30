"use strict";
// Module to export gradients (not default, only if you want them)
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUiGradientColors = exports.getUi = exports.grabientMainGradients = void 0;
// Imports
var grabient_variables_1 = require("./grabient-variables");
Object.defineProperty(exports, "grabientMainGradients", { enumerable: true, get: function () { return grabient_variables_1.grabientMainGradients; } });
var uigradients_variables_1 = require("./uigradients-variables");
Object.defineProperty(exports, "getUi", { enumerable: true, get: function () { return uigradients_variables_1.getUi; } });
Object.defineProperty(exports, "getUiGradientColors", { enumerable: true, get: function () { return uigradients_variables_1.getUiGradientColors; } });
