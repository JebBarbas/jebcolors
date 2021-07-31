"use strict";
// Module to get an uiGradient colors array
// The uiGradients are obtained from the uiGradient webpage: https://uigradients.com/
// and the gradients in uigradients-gradients.ts are obtained fetching this link:
// https://raw.githubusercontent.com/ghosh/uiGradients/master/gradients.json
exports.__esModule = true;
exports.getUi = exports.getUiGradientColors = void 0;
// Imports
var uigradients_gradients_1 = require("./uigradients-gradients");
var functions_1 = require("../functions");
// Exports
/**
 * Gets the array of colors of the given uiGradient
 * @param name The name of the uiGradient you want
 * @returns An array of colors
 * @example
 * getUiGradientColors("Flare") // ["#f12711", "#f5af19"]
 * getUiGradientColors("Witching Hour") // ["#c31432", "#240b36"]
 * getUiGradientColors("    by design") // ["#009FFF", "#ec2F4B"]
 */
var getUiGradientColors = function (name) {
    var wantedGradient = uigradients_gradients_1.uiGradients.find(function (gradient) { return functions_1.clean(gradient.name) === functions_1.clean(name); });
    if (!wantedGradient) {
        throw new Error("The gradient " + name + " doesn't exist in uiGradients, verify that you wrote the name correctly");
    }
    return wantedGradient.colors;
};
exports.getUiGradientColors = getUiGradientColors;
/**
 * Alias from getUiGradientColors
 * @param name The name of the uiGradient you want
 * @returns An array of colors
 * @example
 * getUi("Flare") // ["#f12711", "#f5af19"]
 * getUi("Witching Hour") // ["#c31432", "#240b36"]
 * getUi("    by design") // ["#009FFF", "#ec2F4B"]
 */
var getUi = function (name) {
    return exports.getUiGradientColors(name);
};
exports.getUi = getUi;
//# sourceMappingURL=uigradients-variables.js.map