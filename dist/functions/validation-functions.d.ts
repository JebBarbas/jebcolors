/** To Export all REGEX at once */
export declare const validationRegex: {
    hexChar: RegExp;
    shortHexPartial: RegExp;
    longHexPartial: RegExp;
    hexPartial: RegExp;
    shortHexCode: RegExp;
    longHexCode: RegExp;
    hexCode: RegExp;
};
declare type validation = 'hexChar' | 'shortHexPartial' | 'longHexPartial' | 'hexPartial' | 'shortHexCode' | 'longHexCode' | 'hexCode';
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
export declare const isValidHexCode: (hexCode: string) => boolean;
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
export declare const isValid: (testeableText: string, validationToDo: validation) => boolean;
export {};
