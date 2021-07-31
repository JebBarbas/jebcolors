/**
 * Gets the array of colors of the given uiGradient
 * @param name The name of the uiGradient you want
 * @returns An array of colors
 * @example
 * getUiGradientColors("Flare") // ["#f12711", "#f5af19"]
 * getUiGradientColors("Witching Hour") // ["#c31432", "#240b36"]
 * getUiGradientColors("    by design") // ["#009FFF", "#ec2F4B"]
 */
export declare const getUiGradientColors: (name: string) => string[];
/**
 * Alias from getUiGradientColors
 * @param name The name of the uiGradient you want
 * @returns An array of colors
 * @example
 * getUi("Flare") // ["#f12711", "#f5af19"]
 * getUi("Witching Hour") // ["#c31432", "#240b36"]
 * getUi("    by design") // ["#009FFF", "#ec2F4B"]
 */
export declare const getUi: (name: string) => string[];
