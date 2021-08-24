import { contrastObject, color, numberFrom0To255, numberFrom0To1, gradient } from "../types";
/**
 * "Normalizes" the given value to an rgb value, if the value is greater than 255, returns 255, if is less than 0, returns 0, if is in this range, returns the value (converted in int)
 * @param value The value to "normalize"
 * @returns A "normalized" integer in the range [0,255]
 * @example
 * normalizeColorValue(-100) // 0
 * normalizeColorValue(34) // 34
 * normalizeColorValue(300) // 255
 */
export declare const normalizeColorValue: (value: number) => numberFrom0To255;
/**
 * "Normalizes" the given value to an hsl value, if the value is greater than 1, returns 1, if is less than 0, returns 0, if is in this range, returns the value
 * @param value The value to "normalize"
 * @returns A "normalized" number in the range [0,1]
 * @example
 * normalizeHSLValue(-1) // 0
 * normalizeHSLValue(0.56) // 0.56
 * normalizeHSLValue(2) // 1
 */
export declare const normalizeHSLValue: (value: number) => numberFrom0To1;
/**
 * Converts 3 given values of red, green and blue into an hexCode ("#a1b2c3")
 * @param red The red value of the returned hexCode
 * @param green The green value of the returned hexCode
 * @param blue The blue value of the returned hexCode
 * @returns An hexCode based in the given values
 * @example
 * rgb(255,128,20) // "#ff8014"
 */
export declare const rgb: (red: numberFrom0To255, green: numberFrom0To255, blue: numberFrom0To255) => color;
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
export declare const fixHexCode: (hexCode: color) => color;
/**
 * Converts the hexCode to a fixed one and then gets the value of the red in a range [0,255]
 * @param hexCode The hexCode to get the value of the red
 * @returns The value of the red in the given hexValue
 * @example
 * getRedValue("anyInvalidHexCode") // error
 * getRedValue("#aabbcc") // 170
 */
export declare const getRedValue: (hexCode: color) => numberFrom0To255;
/**
 * Converts the hexCode to a fixed one and then gets the value of the green in a range [0,255]
 * @param hexCode The hexCode to get the value of the green
 * @returns The value of the green in the given hexValue
 * @example
 * getGreenValue("anyInvalidHexCode") // error
 * getGreenValue("#aabbcc") // 187
 */
export declare const getGreenValue: (hexCode: color) => numberFrom0To255;
/**
 * Converts the hexCode to a fixed one and then gets the value of the blue in a range [0,255]
 * @param hexCode The hexCode to get the value of the blue
 * @returns The value of the blue in the given hexValue
 * @example
 * getBlueValue("anyInvalidHexCode") // error
 * getBlueValue("#aabbcc") // 204
 */
export declare const getBlueValue: (hexCode: color) => numberFrom0To255;
/**
 * Gets the red, green and blue values of a given hexCode
 * @param hexCode The hexCode to get the values
 * @returns An array of numbers in [red, green, blue]
 * @example
 * getRGB("#ff8014") // [255,128,20]
 */
export declare const getRGB: (hexCode: color) => numberFrom0To255[];
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
export declare const hslToRgb: (hue: numberFrom0To1, saturation: numberFrom0To1, lightness: numberFrom0To1) => numberFrom0To255[];
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
export declare const rgbToHsl: (red: numberFrom0To255, green: numberFrom0To255, blue: numberFrom0To255) => numberFrom0To1[];
/**
 * Converts 3 given values of hue, saturation and lightness into an hexCode ("#a1b2c3")
 * @param hue The hue value of the returned hexCode
 * @param saturation The saturation value of the returned hexCode
 * @param lightness The lightness value of the returned hexCode
 * @returns An hexCode based in the given values
 * @example
 * hsl(0.83, 0.5, 0.5) // "#bf40bf"
 */
export declare const hsl: (hue: numberFrom0To1, saturation: numberFrom0To1, lightness: numberFrom0To1) => color;
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
export declare const light: (hexCode: color, factor: number) => color;
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
export declare const getRelativeLuminance: (hexCode: color) => numberFrom0To1;
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
export declare const contrastTest: (hexCodeBackground: color, hexCodeForeground: color) => contrastObject;
/**
 * Checks the result of contrastTest with a white text and hexCode as background to check is the color is dark
 * (if is dark, is recommended to put a light text)
 * @param hexCode The color as string
 * @returns A boolean valued true if the hexCode is a dark color
 * @example
 * isDarkColor('#198754') // true
 */
export declare const isDarkColor: (hexCode: color) => boolean;
/**
 * Gets the average color of the colors of a gradient
 * @param hexCodes The hexCodes of the gradient (an array of strings)
 * @returns A color in string format
 * @example
 * averageColor(['#12c2e9','#c471ed','#f64f59']) // #9980ba
 */
export declare const averageColor: (hexCodes: gradient) => color;
