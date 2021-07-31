/**
 * "Normalizes" the given value to an rgb value, if the value is greater than 255, returns 255, if is less than 0, returns 0, if is in this range, returns the value (converted in int)
 * @param value The value to "normalize"
 * @returns A "normalized" integer in the range [0,255]
 * @example
 * normalizeColorValue(-100) // 0
 * normalizeColorValue(34) // 34
 * normalizeColorValue(300) // 255
 */
export declare const normalizeColorValue: (value: number) => number;
/**
 * "Normalizes" the given value to an hsl value, if the value is greater than 1, returns 1, if is less than 0, returns 0, if is in this range, returns the value
 * @param value The value to "normalize"
 * @returns A "normalized" number in the range [0,1]
 * @example
 * normalizeHSLValue(-1) // 0
 * normalizeHSLValue(0.56) // 0.56
 * normalizeHSLValue(2) // 1
 */
export declare const normalizeHSLValue: (value: number) => number;
/**
 * Converts 3 given values of red, green and blue into an hexCode ("#a1b2c3")
 * @param red The red value of the returned hexCode
 * @param green The green value of the returned hexCode
 * @param blue The blue value of the returned hexCode
 * @returns An hexCode based in the given values
 * @example
 * rgb(255,128,20) // "#ff8014"
 */
export declare const rgb: (red: number, green: number, blue: number) => string;
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
export declare const isValidHexCode: (hexCode: string) => boolean;
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
export declare const fixHexCode: (hexCode: string) => string;
/**
 * Converts the hexCode to a fixed one and then gets the value of the red in a range [0,255]
 * @param hexCode The hexCode to get the value of the red
 * @returns The value of the red in the given hexValue
 * @example
 * getRedValue("anyInvalidHexCode") // error
 * getRedValue("#aabbcc") // 170
 */
export declare const getRedValue: (hexCode: string) => number;
/**
 * Converts the hexCode to a fixed one and then gets the value of the green in a range [0,255]
 * @param hexCode The hexCode to get the value of the green
 * @returns The value of the green in the given hexValue
 * @example
 * getGreenValue("anyInvalidHexCode") // error
 * getGreenValue("#aabbcc") // 187
 */
export declare const getGreenValue: (hexCode: string) => number;
/**
 * Converts the hexCode to a fixed one and then gets the value of the blue in a range [0,255]
 * @param hexCode The hexCode to get the value of the blue
 * @returns The value of the blue in the given hexValue *
 * @example
 * getBlueValue("anyInvalidHexCode") // error
 * getBlueValue("#aabbcc") // 204
 */
export declare const getBlueValue: (hexCode: string) => number;
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
export declare const hslToRgb: (hue: number, saturation: number, lightness: number) => number[];
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
export declare const rgbToHsl: (red: number, green: number, blue: number) => number[];
/**
 * Converts 3 given values of hue, saturation and lightness into an hexCode ("#a1b2c3")
 * @param hue The hue value of the returned hexCode
 * @param saturation The saturation value of the returned hexCode
 * @param lightness The lightness value of the returned hexCode
 * @returns An hexCode based in the given values
 * @example
 * hsl(0.83, 0.5, 0.5) // "#bf40bf"
 */
export declare const hsl: (hue: number, saturation: number, lightness: number) => string;
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
export declare const light: (hexCode: string, factor: number) => string;
