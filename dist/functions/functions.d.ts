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
export declare const normalize: (value: number, min: number, max: number) => number;
/**
 * "Cleans" the given string doing a trim() and a toLowerCase()
 * @param string The string to "clean"
 * @returns The "cleaned" string
 * @example
 * clean("     HOLA     ") // "hola"
 */
export declare const clean: (string: string) => string;
/**
 * Converts a number expressed like a percentage to a floating number.
 * - percentage(100) // 1
 * - percentage(50) // 0.5
 * - percentage(3) // 0.03
 * @param value The value to convert in a float
 * @param normalize If true, then the returned value is goint to be in the range [0,100]
 * - percentage(300) // 3
 * - percentage(300, false) // 3
 * - percentage(300, true) // 1
 * @returns The value converted in a float value
 */
export declare const percentage: (value: number, normalize?: boolean | undefined) => number;
