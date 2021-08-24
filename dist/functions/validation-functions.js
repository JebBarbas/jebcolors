"use strict";
/*  Functions relationated with validate colors and things like that, procurate to use regExp   */
exports.__esModule = true;
exports.isValid = exports.isValidHexCode = exports.validationRegex = void 0;
/*  RegExp  */
/** To match one valid hexChar DOESNT CAPTURE*/
var hexCharREGEX = /[0-9a-f]{1}/i;
/** To match one valid color value (in short color) DOESNT CAPTURE */
var shortHexPartialREGEX = /^[0-9a-f]{1}$/i;
/** To match one valid color value (in long color) DOESNT CAPTURE */
var longHexPartialREGEX = /^[0-9a-f]{2}$/i;
/** To match one valid color value (short or long) DOESNT CAPTURE */
var hexPartialREGEX = /^[0-9a-f]{1,2}$/i;
/** To match one short hexCode CAPTURE RED, GREEN, BLUE */
var shortHexCodeREGEX = /^#([0-9a-f]{1})([0-9a-f]{1})([0-9a-f]{1})$/i;
/** To match one long hexCode CAPTURE RED, GREEN, BLUE */
var longHexCodeREGEX = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i;
/** To match one hexCode (short or long) DOESNT CAPTURE */
var hexCodeREGEX = /^#([0-9a-f]{3}){1,2}$/i;
/** To Export all REGEX at once */
exports.validationRegex = {
    'hexChar': hexCharREGEX,
    'shortHexPartial': shortHexPartialREGEX,
    'longHexPartial': longHexPartialREGEX,
    'hexPartial': hexPartialREGEX,
    'shortHexCode': shortHexCodeREGEX,
    'longHexCode': longHexCodeREGEX,
    'hexCode': hexCodeREGEX
};
/*  Functions   */
/**
 * Checks if the given hexCode is valid, must pass this tests:
 * 1. The hexValue starts with the "#" character
 * 2. The hexValue must be 4 or 7 characters long, for instance: "#123" or "#1a2b3c"
 * 3. All the characters (excluding the first "#") of the hexCode must be valid hexadecimal values [0-9a-fA-F]
 * @deprecated Use {@link isValid} instead
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
    return hexCodeREGEX.test(hexCode);
};
exports.isValidHexCode = isValidHexCode;
/**
 * Tests if testeableString is a type of validationToDO
 * @param testeableText The string to check if is valid
 * @param validationToDo A valid validator-sting
 * @see {@link validation} to the the validator-string's (typescript)
 * @returns A boolean
 * @example
 * isValid('a','hexChar') // true
 * isValid('24','longHexPartial') // true
 * isValid('#foobar', 'hexCode') // false
 */
var isValid = function (testeableText, validationToDo) {
    var regexp = exports.validationRegex[validationToDo];
    if (!regexp)
        return false;
    return regexp.test(testeableText);
};
exports.isValid = isValid;
//# sourceMappingURL=validation-functions.js.map