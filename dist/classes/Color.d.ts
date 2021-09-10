import type { HexadecimalColor, RED, GREEN, BLUE, RGB, RGBA, HUE, SATURATION, LIGHTNESS, HSL, LUMINANCE, JEB, ContrastObject, CodeEvaluation } from './types';
import { Gradient } from './Gradient';
/**
 * Class with basic functions of a color
 * (If you want to add the gradient creator use class GradientableColor)
 */
export declare class Color {
    private _code;
    private _rgb;
    private _hsl;
    private _luminance;
    private _jeb;
    private _dark;
    private _lightdarkconst;
    constructor(code: string);
    /**
     * Tests if a given code is a valid code and returns a CodeEvalutation {type, valid}
     * @param code The code of the color
     * @returns a CodeEvaluation object
     * @example
     * Color.test('#c00')
     * // return
     * {type: 'rgb', valid: true}
     *
     * Color.test('#ff0000')
     * // return
     * {type: 'rrggbb', valid: true}
     *
     * Color.test('red')
     * // return
     *  {type: 'css', valid:true}
     *
     * Color.test('aaa')
     * // return
     *  {type: 'invalid', valid:false}
     */
    static test(code: string): CodeEvaluation;
    /**
     * Gets the contrast values of 2 supercolors
     * @param color1 the first supercolor (the background supercolor)
     * @param color2 the second supercolor (the fore color supercolor)
     * @returns A Contrast Object
     * @example
     * Color.contrast("#ffffff","#000000")
     *
     * // return
     *
     * {
     *     passes: {
     *         normal: { minimal: true, perfect: true },
     *         bold: { minimal: true, perfect: true }
     *     }
     * }
     */
    static contrast(color1: Color, color2: Color): ContrastObject;
    /**
     * Creates a new Color instance for the given 3 values
     * @param RGB An array with [red, green, blue] values [0,255]
     * @returns A supercolor (Color instance)
     */
    static rgb(RGB: RGB): Color;
    /**
     * Creates a new Color instance for the given 3 values
     * @param HSL An array with [hue, saturation, lightness] values [0,360], [0,100] & [0,100]
     * @returns A supercolor (Color instance)
     */
    static hsl(HSL: HSL): Color;
    private static normalize;
    /**
     * Returns a random supercolor
     * @returns A random supercolor
     */
    static random(): Color;
    /**
     * Returns a random supercolor based on a seed
     * @param seed The seed
     * @returns A random supercolor
     */
    static seed(seed: string): Color;
    private getRGB;
    private getHSL;
    private getLuminance;
    private YiqFormula;
    /**
     * Hexadecimal code of the color
     */
    get code(): HexadecimalColor;
    /**
     * Red value of the color
     */
    get red(): RED;
    /**
     * Green value of the color
     */
    get green(): GREEN;
    /**
     * Blue value of the color
     */
    get blue(): BLUE;
    /**
     * Array of the 3 colors [red, green, blue]
     */
    get rgb(): RGB;
    /**
     * Hue of the color
     */
    get hue(): HUE;
    /**
     * Saturation of the color
     */
    get saturation(): SATURATION;
    /**
     * Lightness of the color
     */
    get lightness(): LIGHTNESS;
    /**
     * Array of the 3 hsl values [hue, saturation, lightness]
     */
    get hsl(): HSL;
    /**
     * Array with the values of the color [cyan, magenta, yellow, black]
     */
    get cmyk(): [number, number, number, number];
    /**
     * Luminance of the color
     */
    get luminance(): LUMINANCE;
    /**
     * A constant of the color based on YIQ used to get if the color is dark
     */
    get jeb(): JEB;
    /**
     * Boolean saying if the color is a dark color
     */
    get isDark(): boolean;
    /**
     * Boolean saying if the color is a light color
     */
    get isLight(): boolean;
    /**
     * Returns white o black, depending of the jeb constant of the color
     * This is to get the best color for a text assuming, that the supercolor is the background color
     */
    get text(): HexadecimalColor;
    /**
     * Makes the color transparent
     * @param alpha The alpha that the color is going to have, in range [0,100] 0 - trasparent, 100 - opaque
     * @returns A string representing a rgba color 'rgba(255,0,0,.5)' for instance
     * @example
     * htmlElement.style.backgroundColor = supercolor("red").alpha(50) // half-transparent red
     */
    alpha(alpha: number): RGBA;
    /**
     * Multiplies the saturation os a color in factor times
     * @param factor The times you want to multiply the saturation of the color
     * @returns A supercolor
     */
    saturate(factor: number): Color;
    /**
     * Divivdes the saturation os a color in factor times
     * @param factor The times you want to divide the saturation of the color
     * @returns A supercolor
     */
    desaturate(factor: number): Color;
    /**
     * Multiplies the lightness os a color in factor times
     * @param factor The times you want to multiply the lightness of the color
     * @returns A supercolor
     */
    lighten(factor: number): Color;
    /**
     * Divides the lightness os a color in factor times
     * @param factor The times you want to divide the lightness of the color
     * @returns A supercolor
     */
    darken(factor: number): Color;
    /**
     * Rotates the hue os a color in degrees degress
     * @param degrees The times you want to multiply the saturation of the color
     * @returns A supercolor
     */
    rotate(degrees: number): Color;
    /**
     * Rotates the hue of a color step steps (1 step = 30 degrees)
     * @param steps The steps
     * @returns a supercolor
     */
    next(steps: number): Color;
    /**
     * Rotates (in the opposite direction) the hue of a color step steps (1 step = 30 degrees)
     * @param steps The steps
     * @returns a supercolor
     */
    previous(steps: number): Color;
    /**
     * The negative of the color
     */
    get negative(): Color;
    /**
     * The complementary color (hue rotated 180 degrees)
     */
    get complementary(): Color;
    /**
     * The analogous colors
     */
    get analogous(): [Color, Color];
    /**
     * The split complementary colors
     */
    get splitComplementary(): [Color, Color];
    /**
     * The triadic colors
     */
    get triadic(): [Color, Color];
    /**
     * The color a little bit darker
     */
    get hover(): Color;
    /**
     * The color a little bit lighter
     */
    get disabled(): Color;
    /**
     * The monocromatic colors
     */
    get monocromatic(): [Color, Color];
    /**
     * The color converted to a grayscale
     */
    get grayscale(): Color;
    /**
     * Converts the supercolor to a string
     * @returns The hexadecimal hexcode
     */
    toString(): string;
}
export declare class GradientableColor extends Color {
    private _gradientWithNegative;
    private _gradientWithComplementary;
    private _gradientWithAnalogous;
    private _gradientWithSplitComplementary;
    private _gradientWithTriadic;
    private _gradientWithLighter;
    private _gradientWithDarker;
    private _gradientWithMonocromatic;
    constructor(code: string);
    private gNegative;
    private gComplementary;
    private gAnalogous;
    private gSplitComplementary;
    private gTriadic;
    private gLighter;
    private gDarker;
    private gMonocromatic;
    /**
     * A gradient that contains the color in middle and is surrounded by its analogous
     */
    get gradientWithAnalogous(): Gradient;
    /**
     * A gradient that starts with the color and ends with its complementary
     * (There is a middle color in between to avoid crossing the gray)
     */
    get gradientWithComplementary(): Gradient;
    /**
     * A gradient that starts with the color and ends with a darker version of the color
     */
    get gradientWithDarker(): Gradient;
    /**
     * A gradient that starts with the color and ends with a lighter version of the color
     */
    get gradientWithLighter(): Gradient;
    /**
     * A gradient that contains the color in middle and is surrounded by its lighter and darker versions
     */
    get gradientWithMonocromatic(): Gradient;
    /**
     * A gradient that starts with the color and ends with its negative
     * (There is a middle color in between to avoid crossing the gray)
     */
    get gradientWithNegative(): Gradient;
    /**
     * A gradient that contains the color in middle and is surrounded by its split complementaries
     */
    get gradientWithSplitComplementary(): Gradient;
    /**
     * A gradient that contains the color in middle and is surrounded by its triadic
     */
    get gradientWithTriadic(): Gradient;
}
export declare const supercolor: (code: string) => Color;
export declare const megacolor: (code: string) => GradientableColor;
export declare const upgradecolor: (codeOrColor: string | Color) => Color | GradientableColor;
