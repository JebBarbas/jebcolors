"use strict";
// Exported functions to help with colors
exports.__esModule = true;
exports.averageColor = exports.isDarkColor = exports.contrastTest = exports.getRelativeLuminance = exports.light = exports.hsl = exports.rgbToHsl = exports.hslToRgb = exports.getRGB = exports.getBlueValue = exports.getGreenValue = exports.getRedValue = exports.fixHexCode = exports.rgb = exports.normalizeHSLValue = exports.normalizeColorValue = void 0;
// Imports
var functions_1 = require("./functions");
var validation_functions_1 = require("./validation-functions");
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
    var longHexCode = validation_functions_1.validationRegex.longHexCode, shortHexCode = validation_functions_1.validationRegex.shortHexCode;
    if (!validation_functions_1.isValid(hexCode, "hexCode")) {
        throw new Error("The given hexCode is not valid: " + hexCode);
    }
    hexCode = functions_1.clean(hexCode);
    if (validation_functions_1.isValid(hexCode, 'shortHexCode')) {
        var result = shortHexCode.exec(hexCode);
        if (!result)
            throw new Error('Error in regexp');
        var _ = result[0], red = result[1], green = result[2], blue = result[3];
        return "#" + red + red + green + green + blue + blue;
    }
    else if (validation_functions_1.isValid(hexCode, 'longHexCode')) {
        var result = longHexCode.exec(hexCode);
        if (!result)
            throw new Error('Error in regexp');
        var _ = result[0], red = result[1], green = result[2], blue = result[3];
        return "#" + red + green + blue;
    }
    else {
        throw new Error("The given hexCode is valid but not valid: " + hexCode);
    }
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
 * @returns The value of the blue in the given hexValue
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
 * Gets the red, green and blue values of a given hexCode
 * @param hexCode The hexCode to get the values
 * @returns An array of numbers in [red, green, blue]
 * @example
 * getRGB("#ff8014") // [255,128,20]
 */
var getRGB = function (hexCode) {
    /* No need to fix because getXValue does */
    return [exports.getRedValue(hexCode), exports.getGreenValue(hexCode), exports.getBlueValue(hexCode)];
};
exports.getRGB = getRGB;
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
    /* No need to fix because getRGB does with getXValue */
    var _a = exports.getRGB(hexCode), red = _a[0], green = _a[1], blue = _a[2];
    red *= factor;
    green *= factor;
    blue *= factor;
    red = exports.normalizeColorValue(red);
    green = exports.normalizeColorValue(green);
    blue = exports.normalizeColorValue(blue);
    return exports.rgb(red, green, blue);
};
exports.light = light;
/**
 * Gets the relative luminance (is different that HSL lightness) of a color
 * https://www.w3.org/TR/WCAG20/#relativeluminancedef
 * @param hexCode The color as string
 * @returns A number in range [0,1] with the relative luminance
 * @example
 * getRelativeLuminance('#000000') // 0
 * getRelativeLuminance('#ffffff') // 1
 * getRelativeLuminance('#198754') // 0.18174712291948017
 */
var getRelativeLuminance = function (hexCode) {
    /* No need to fix, getRGB does in getXValue */
    var _a = exports.getRGB(hexCode), red = _a[0], green = _a[1], blue = _a[2];
    red /= 255;
    green /= 255;
    blue /= 255;
    red = red <= 0.03928 ? red / 12.92 : Math.pow(((red + 0.055) / 1.055), 2.4);
    green = green <= 0.03928 ? green / 12.92 : Math.pow(((green + 0.055) / 1.055), 2.4);
    blue = blue <= 0.03928 ? blue / 12.92 : Math.pow(((blue + 0.055) / 1.055), 2.4);
    var luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
    return luminance;
};
exports.getRelativeLuminance = getRelativeLuminance;
/**
 * Calculates if a text of color hexCodeForeground over a background of color hexCodeBackground passes the tests
 * of contrast according to W3C.
 * https://www.w3.org/TR/WCAG20/#contrast-ratiodef
 * https://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast (normal text)
 * https://www.w3.org/TR/WCAG20/#visual-audio-contrast7 (bold text)
 * @param hexCodeBackground The color of the background as string
 * @param hexCodeForeground The color of the text as string
 * @returns An object that says what test the colors passed
 * @example
 * contrastTest('#198754', '#f8f9fa')
 * // {
 * //     minimumContrastWithNormalText: false,
 * //     perfectContrastWithNormalText: false,
 * //     minimumContrastWithBoldText: true,
 * //     perfectContrastWithBoldText: false
 * // }
 *
 */
var contrastTest = function (hexCodeBackground, hexCodeForeground) {
    /* No need to fic gRL() does in getRGB() */
    var luminanceBack = exports.getRelativeLuminance(hexCodeBackground);
    /* No need to fic gRL() does in getRGB() */
    var luminanceFore = exports.getRelativeLuminance(hexCodeForeground);
    var maxLuminance = Math.max(luminanceBack, luminanceFore);
    var minLuminance = Math.min(luminanceBack, luminanceFore);
    /*
    * Contrast Ratio Formula
    * https://www.w3.org/TR/WCAG20/#contrast-ratiodef
    */
    var ratio = (maxLuminance + 0.05) / (minLuminance + 0.05);
    /*
    * Contrast values
    * https://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast (normal text)
    * https://www.w3.org/TR/WCAG20/#visual-audio-contrast7 (bold text)
    */
    var contrast = {
        minimumContrastWithNormalText: ratio >= 4.5,
        perfectContrastWithNormalText: ratio >= 7,
        minimumContrastWithBoldText: ratio >= 3,
        perfectContrastWithBoldText: ratio >= 4.5
    };
    return contrast;
};
exports.contrastTest = contrastTest;
/**
 * Checks the result of contrastTest with a white text and hexCode as background to check is the color is dark
 * (if is dark, is recommended to put a light text)
 * @param hexCode The color as string
 * @returns A boolean valued true if the hexCode is a dark color
 * @example
 * isDarkColor('#198754') // true
 */
var isDarkColor = function (hexCode) {
    hexCode = exports.fixHexCode(hexCode);
    var white = '#ffffff';
    return exports.contrastTest(hexCode, white).minimumContrastWithBoldText;
};
exports.isDarkColor = isDarkColor;
/**
 * Gets the average color of the colors of a gradient
 * @param hexCodes The hexCodes of the gradient (an array of strings)
 * @returns A color in string format
 * @example
 * averageColor(['#12c2e9','#c471ed','#f64f59']) // #9980ba
 */
var averageColor = function (hexCodes) {
    // No need to fix, getRGB does
    var globalRed = 0, globalGreen = 0, globalBlue = 0;
    hexCodes.forEach(function (hexCode) {
        var _a = exports.getRGB(hexCode), red = _a[0], green = _a[1], blue = _a[2];
        globalRed += red;
        globalGreen += green;
        globalBlue += blue;
    });
    globalRed /= hexCodes.length;
    globalGreen /= hexCodes.length;
    globalBlue /= hexCodes.length;
    return exports.rgb(globalRed, globalGreen, globalBlue);
};
exports.averageColor = averageColor;
//# sourceMappingURL=color-functions.js.map