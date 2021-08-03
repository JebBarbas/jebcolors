"use strict";
// Functions not relationated with colors, but used in them
exports.__esModule = true;
exports.deg = exports.percentage = exports.clean = exports.normalize = void 0;
// Exports
/**
 * "Normalizes" the given value, if the value is less than min, then min is returned. If the value is greater than
 * max, then max is returned, otherwise, value is returned (this means that value is in the range [min,max])
 * @param value The value to "normalize"
 * @param min The minimum value that value can have
 * @param max The maximum value that value can have
 * @returns The "normalized value"
 * @example
 * normalize(100, 1, 200) // 100
 * normalize(56, 1, 10) // 10
 * normalize(0, 1, 6) // 1
 */
var normalize = function (value, min, max) {
    if (value < min) {
        return min;
    }
    if (value > max) {
        return max;
    }
    return value;
};
exports.normalize = normalize;
/**
 * "Cleans" the given string doing a trim() and a toLowerCase()
 * @param string The string to "clean"
 * @returns The "cleaned" string
 * @example
 * clean("     HOLA     ") // "hola"
 */
var clean = function (string) {
    return string.trim().toLowerCase();
};
exports.clean = clean;
/**
 * Converts a number expressed like a percentage to a floating number.
 * @param value The value to convert in a float
 * @param normalize If true, then the returned value is goint to be in the range [0,100]
 * @returns The value converted in a float value
 * @example
 * percentage(100) // 1
 * percentage(50) // 0.5
 * percentage(3) // 0.03
 * percentage(200) // 2
 * percentage(200,true) // 1
 */
var percentage = function (value, normalizeValue) {
    var percentage = value / 100;
    if (normalizeValue) {
        return exports.normalize(percentage, 0, 100);
    }
    return percentage;
};
exports.percentage = percentage;
/**
 * Converts a number of degrees to a number in the range [0,1], if the given number is >360 the function
 * will use the rest (for instance, use deg(60) returns the same as deg(420) and deg(780))
 * @param degrees The degrees
 * @returns A number in the range [0,1]
 * @example
 * deg(180) // 0.5
 * deg(0) // 0
 * deg(360) // 0
 * deg(420) // 0.1666...
 * deg(359) // 0.997222...
 * deg(719) // 0.997222...
 */
var deg = function (degrees) { return (degrees % 360) / 360; };
exports.deg = deg;
//# sourceMappingURL=functions.js.map