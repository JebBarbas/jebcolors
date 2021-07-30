"use strict";
// Exported functions to help with colors
Object.defineProperty(exports, "__esModule", { value: true });
exports.light = exports.hsl = exports.rgbToHsl = exports.hslToRgb = exports.getBlueValue = exports.getGreenValue = exports.getRedValue = exports.fixHexCode = exports.isValidHexCode = exports.rgb = exports.normalizeHSLValue = exports.normalizeColorValue = void 0;
// Imports
var functions_1 = require("../functions/functions");
// Exports
/**
 * "Normalizes" the given value to an rgb value, if the value is greater than 255, returns 255, if is less than 0, returns 0, if is in this range, returns the value (converted in int)
 * @param value The value to "normalize"
 * @returns A "normalized" integer in the range [0,255]
 * @example
 * normalizeColorValue(-100) // 0
 * normalizeColorValue(34) // 34
 * normalizeColorValue(300) // 255
 */
var normalizeColorValue = function (value) {
    return Math.floor(functions_1.normalize(value, 0, 255));
};
exports.normalizeColorValue = normalizeColorValue;
/**
 * "Normalizes" the given value to an hsl value, if the value is greater than 1, returns 1, if is less than 0, returns 0, if is in this range, returns the value
 * @param value The value to "normalize"
 * @returns A "normalized" number in the range [0,1]
 * @example
 * normalizeHSLValue(-1) // 0
 * normalizeHSLValue(0.56) // 0.56
 * normalizeHSLValue(2) // 1
 */
var normalizeHSLValue = function (value) {
    return functions_1.normalize(value, 0, 1);
};
exports.normalizeHSLValue = normalizeHSLValue;
/**
 * Converts 3 given values of red, green and blue into an hexCode ("#a1b2c3")
 * @param red The red value of the returned hexCode
 * @param green The green value of the returned hexCode
 * @param blue The blue value of the returned hexCode
 * @returns An hexCode based in the given values
 * @example
 * rgb(255,128,20) // "#ff8014"
 */
var rgb = function (red, green, blue) {
    red = exports.normalizeColorValue(red);
    green = exports.normalizeColorValue(green);
    blue = exports.normalizeColorValue(blue);
    /* Converts to hex, if the result is something like f, transforms into 0f */
    var stringRed = red.toString(16).length === 1 ? "0" + red.toString(16) : red.toString(16);
    var stringGreen = green.toString(16).length === 1 ? "0" + green.toString(16) : green.toString(16);
    var stringBlue = blue.toString(16).length === 1 ? "0" + blue.toString(16) : blue.toString(16);
    var hexCode = "#" + stringRed + stringGreen + stringBlue;
    return hexCode;
};
exports.rgb = rgb;
/**
 * Checks if the given hexCode is valid, must pass this tests:
 * 1. The hexValue starts with the "#" character
 * 2. The hexValue must be 4 or 7 characters long, for instance: "#123" or "#1a2b3c"
 * 3. All the characters (excluding the first "#") of the hexCode must be valid hexadecimal values [0-9a-fA-F]
 * @param hexCode The string to verify if is a valid hexCode
 * @returns If the given hexValue is valid
 * @example
 * isValidHexCode("ffffff") // false
 * isValidHexCode("#aabbccdd") // false
 * isValidHexCode("#ffhola") // false
 * isValidHexCode("#ff64bf") // true
 * isValidHexCode("#c00") // true
 */
var isValidHexCode = function (hexCode) {
    hexCode = functions_1.clean(hexCode);
    var colorLengths = [4, 7]; // The length of a color string, incluying the "#" character
    var hexValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']; // The valid hex characters
    var charArray = hexCode.substr(1).split(''); // Puts in an array all the characters of the color except the first one (which must be the "#" character)
    // Validates if the hexValue starts with "#"
    if (!hexCode.startsWith('#')) {
        return false;
    }
    if (!colorLengths.includes(hexCode.length)) {
        return false;
    }
    charArray.forEach(function (char) {
        if (!hexValues.includes(char)) {
            return false;
        }
    });
    return true;
};
exports.isValidHexCode = isValidHexCode;
/**
 * First checks if the given hexCode is valid, if true, then converts it to a fixed hexCode that:
 * 1. Is in lowercase
 * 2. Is 7 characters long
 * - For instance: "#AAA" will convert to "#aaaaaa"
 * @param hexCode The hexCode to fix
 * @returns The fixed hexCode
 * @example
 * fixHexCode("anyInvalidHexCode") // error
 * fixHexCode("#F0F") // "#ff00ff"
 */
var fixHexCode = function (hexCode) {
    if (!exports.isValidHexCode(hexCode)) {
        throw new Error("The given hexCode is not valid: " + hexCode);
    }
    hexCode = functions_1.clean(hexCode);
    var finalHexCode = "";
    switch (hexCode.length) {
        case 4: // #123
            finalHexCode += '#'; // adds "#"
            finalHexCode += hexCode.charAt(1) + hexCode.charAt(1); // adds red // #ff11
            finalHexCode += hexCode.charAt(2) + hexCode.charAt(2); // adds green // #ff1122
            finalHexCode += hexCode.charAt(3) + hexCode.charAt(3); // ads blue // #ff112233
            break;
        case 7: // #1a2b3c
            finalHexCode = hexCode;
            break;
    }
    return finalHexCode;
};
exports.fixHexCode = fixHexCode;
/**
 * Converts the hexCode to a fixed one and then gets the value of the red in a range [0,255]
 * @param hexCode The hexCode to get the value of the red
 * @returns The value of the red in the given hexValue
 * @example
 * getRedValue("anyInvalidHexCode") // error
 * getRedValue("#aabbcc") // 170
 */
var getRedValue = function (hexCode) {
    hexCode = exports.fixHexCode(hexCode);
    return parseInt(hexCode.substr(1, 2), 16);
};
exports.getRedValue = getRedValue;
/**
 * Converts the hexCode to a fixed one and then gets the value of the green in a range [0,255]
 * @param hexCode The hexCode to get the value of the green
 * @returns The value of the green in the given hexValue
 * @example
 * getGreenValue("anyInvalidHexCode") // error
 * getGreenValue("#aabbcc") // 187
 */
var getGreenValue = function (hexCode) {
    hexCode = exports.fixHexCode(hexCode);
    return parseInt(hexCode.substr(3, 2), 16);
};
exports.getGreenValue = getGreenValue;
/**
 * Converts the hexCode to a fixed one and then gets the value of the blue in a range [0,255]
 * @param hexCode The hexCode to get the value of the blue
 * @returns The value of the blue in the given hexValue *
 * @example
 * getBlueValue("anyInvalidHexCode") // error
 * getBlueValue("#aabbcc") // 204
 */
var getBlueValue = function (hexCode) {
    hexCode = exports.fixHexCode(hexCode);
    return parseInt(hexCode.substr(5, 2), 16);
};
exports.getBlueValue = getBlueValue;
/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes hue, saturation, and lightness are contained in the set [0, 1] and
 * returns red, green, and blue in the set [0, 255].
 * @param hue The hue
 * @param saturation The saturation
 * @param lightness The lightness
 * @returns An array of 3 elements where are the 3 values [red,green,blue]
 * @example
 * hslToRgb(0.83, 0.5, 0.5) // [191, 64, 191]
 */
var hslToRgb = function (hue, saturation, lightness) {
    hue = exports.normalizeHSLValue(hue);
    saturation = exports.normalizeHSLValue(saturation);
    lightness = exports.normalizeHSLValue(lightness);
    var red = 0;
    var green = 0;
    var blue = 0;
    if (saturation == 0) {
        red = green = blue = lightness; // achromatic
    }
    else {
        var hue2rgb = function (p, q, t) {
            if (t < 0)
                t += 1;
            if (t > 1)
                t -= 1;
            if (t < 1 / 6)
                return p + (q - p) * 6 * t;
            if (t < 1 / 2)
                return q;
            if (t < 2 / 3)
                return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        var q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
        var p = 2 * lightness - q;
        red = hue2rgb(p, q, hue + 1 / 3);
        green = hue2rgb(p, q, hue);
        blue = hue2rgb(p, q, hue - 1 / 3);
    }
    return [Math.round(red * 255), Math.round(green * 255), Math.round(blue * 255)];
};
exports.hslToRgb = hslToRgb;
/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes red, green, and blue are contained in the set [0, 255] and
 * returns hue, saturation, and lightness in the set [0, 1].
 * @param red The red color value
 * @param green The green color value
 * @param blue The blue color value
 * @returns An array of 3 elements where are the 3 values [hue,saturation,lightness]
 * @example
 * rgbToHsl(191, 64, 191) // [0.83, 0.5, 0.5]
 */
var rgbToHsl = function (red, green, blue) {
    red = exports.normalizeColorValue(red);
    green = exports.normalizeColorValue(green);
    blue = exports.normalizeColorValue(blue);
    red /= 255;
    green /= 255;
    blue /= 255;
    var max = Math.max(red, green, blue);
    var min = Math.min(red, green, blue);
    var hue = 0;
    var saturation = 0;
    var lightness = (max + min) / 2;
    if (max == min) {
        hue = saturation = 0; // achromatic
    }
    else {
        var d = max - min;
        saturation = lightness > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case red:
                hue = (green - blue) / d + (green < blue ? 6 : 0);
                break;
            case green:
                hue = (blue - red) / d + 2;
                break;
            case blue:
                hue = (red - green) / d + 4;
                break;
        }
        hue /= 6;
    }
    return [hue, saturation, lightness];
};
exports.rgbToHsl = rgbToHsl;
/**
 * Converts 3 given values of hue, saturation and lightness into an hexCode ("#a1b2c3")
 * @param hue The hue value of the returned hexCode
 * @param saturation The saturation value of the returned hexCode
 * @param lightness The lightness value of the returned hexCode
 * @returns An hexCode based in the given values
 * @example
 * hsl(0.83, 0.5, 0.5) // "#bf40bf"
 */
var hsl = function (hue, saturation, lightness) {
    hue = exports.normalizeHSLValue(hue);
    saturation = exports.normalizeHSLValue(saturation);
    lightness = exports.normalizeHSLValue(lightness);
    var _a = exports.hslToRgb(hue, saturation, lightness), red = _a[0], green = _a[1], blue = _a[2];
    return exports.rgb(red, green, blue);
};
exports.hsl = hsl;
/**
 * Recieves an hexCode and returns an hexCode but with the color lighten in factor
 * - if factor < 1 then the returned color is darker
 * - if factor = 1 then the returned color is the same
 * - if factor > 1 then the returned color is lighter
 * @param hexCode The hexCode to change
 * @param factor The times the color is going to be lighten
 * @returns An hexCode factor times lighter
 * @example
 * light("anyInvalidHexCode",1) // error
 * light("#780000", 0.5) // "#3c0000"
 * light("#780000", 1) // "#780000"
 * light("#780000", 1.5) // "#b40000"
 */
var light = function (hexCode, factor) {
    hexCode = exports.fixHexCode(hexCode);
    var red = exports.getRedValue(hexCode);
    var green = exports.getGreenValue(hexCode);
    var blue = exports.getBlueValue(hexCode);
    red *= factor;
    green *= factor;
    blue *= factor;
    red = exports.normalizeColorValue(red);
    green = exports.normalizeColorValue(green);
    blue = exports.normalizeColorValue(blue);
    return exports.rgb(red, green, blue);
};
exports.light = light;
