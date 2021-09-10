import type { CSSColorName, CodeEvaluation, HexadecimalColor, HEX00FF, RGBAV } from './types';
/**
 * Evaluates the code given to check if its a valid hexadecimal color
 * @param code The hexadecimal color to evaluate
 * @returns An object, where 'valid' says if the code is a valid hexadecimal color and type says
 * what kind of hexadecimal is ('rbg' | 'rgba' | 'rrggbb' | 'rrggbbaa'), can also get a css color name,
 * and the function internaly will run {@link css} to get the hexadecimal color and return a valid code
 */
export declare const evaluateCode: (code: HexadecimalColor) => CodeEvaluation;
/**
 * Gets the hexadecimal color of the given CSS Color Name
 * @param cssColorName The CSS Color Name (can be lowercased or camelCased) ex:(darkRed and darkred are both true)
 * @returns The hexadecimal color of the CSS Color Name.
 * This code can be runned on vanilla Javascript, so, if the given cssColorName doesn't exist, you'll get
 * the white color
 */
export declare const css: (cssColorName: CSSColorName) => HexadecimalColor;
/**
 * Uses the code evaluation and converts a code into a full code
 * #abc passes to #aabbcc.
 * Also converts css color name into a code (if you are sure that the parameter is a css color name
 * better use {@link css} because its shorter)
 * @param code The code in format #abc, #aabbcc or a CSS Color Name
 * @returns
 */
export declare const getFullCode: (code: HexadecimalColor) => HexadecimalColor;
/**
 * Converts an hexadecimal digit 00-ff to a int
 * @param hex A hexadecimal value 00-ff
 * @returns A number (integer) between 0-255 (if the given hex is invalid returns 0)
 */
export declare const hex: (hex: HEX00FF) => RGBAV;
