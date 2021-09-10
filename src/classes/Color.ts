import {evaluateCode, getFullCode, hex} from './functions'
import { rrggbbREGEX } from './regex'
import { internalError, layer8Error } from './errors'
import type {
    HexadecimalColor,
    HEX00FF, 
    RGBAV, RED, GREEN, BLUE, RGB, RGBA,
    HUE, SATURATION, LIGHTNESS, HSL,
    LUMINANCE,
    JEB,
    ContrastObject, 
    NormalizationType,
    CodeEvaluation,
} from './types'
import convert from 'color-convert'
import { supergradient, Gradient} from './Gradient'
import seedrandom from 'seedrandom'

/**
 * Class with basic functions of a color
 * (If you want to add the gradient creator use class GradientableColor)
 */
export class Color {
    private _code: HexadecimalColor
    private _rgb: RGB
    private _hsl: HSL
    private _luminance: LUMINANCE
    private _jeb: JEB
    private _dark: boolean
    private _lightdarkconst = 1.5

    constructor(code:string){
        this._code = getFullCode(code)

        this._rgb = this.getRGB()

        this._hsl = this.getHSL()

        this._luminance = this.getLuminance()

        // Didn't know how to name this number, so I named is 'Color Jeb Constant' to be mamon
        this._jeb = this.YiqFormula()

        this._dark = this._jeb < 128
    }

    // Static Methods
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
    static test(code:string):CodeEvaluation{
        return evaluateCode(code)
    }

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
    static contrast(color1:Color, color2:Color):ContrastObject{
        if(color1 instanceof Color && color2 instanceof Color){
            // Formula (Ratio): https://www.w3.org/TR/WCAG20/#contrast-ratiodef
            // Contrast Conditions: https://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast (normal)
            // Contrast Conditions: https://www.w3.org/TR/WCAG20/#visual-audio-contrast7 (bold)
            const maxL = Math.max(color1.luminance, color2.luminance)
            const minL = Math.min(color1.luminance, color2.luminance)

            const ratio = (maxL + 0.05) / (minL + 0.05)

            const contrast:ContrastObject = {
                passes: {
                    normal: {
                        minimal: ratio >= 4.5,
                        perfect: ratio >= 7
                    },
                    bold: {
                        minimal: ratio >= 3,
                        perfect: ratio >= 4.5
                    }
                }
            }

            return contrast
        }
        else{
            throw layer8Error(`Must provide 2 instances of Color, in contrast() in Color(), providen were: ${typeof color1} and ${typeof color2}`)
        }
    }

    /**
     * Creates a new Color instance for the given 3 values
     * @param RGB An array with [red, green, blue] values [0,255]
     * @returns A supercolor (Color instance)
     */
    static rgb(RGB:RGB):Color{
        const [red, green, blue] = RGB.map((rgbav:RGBAV)=>Color.normalize(rgbav,'RGB'))
        const rrggbb = convert.rgb.hex([red,green,blue])
        return supercolor(`#${rrggbb}`)
    }

    /**
     * Creates a new Color instance for the given 3 values
     * @param HSL An array with [hue, saturation, lightness] values [0,360], [0,100] & [0,100]
     * @returns A supercolor (Color instance)
     */
    static hsl(HSL:HSL):Color{
        let [hue,saturation,lightness] = HSL
        hue = Color.normalize(hue,'H')
        saturation = Color.normalize(saturation,'SL')
        lightness = Color.normalize(lightness,'SL')
        const rrggbb = convert.hsl.hex([hue,saturation,lightness])
        return supercolor(`#${rrggbb}`)
    }

    private static normalize(value:number,to:NormalizationType):RGBAV|HUE|SATURATION|LIGHTNESS|JEB{
        const normalize = (value:number, min:number, max:number):number =>{
            return Math.min(Math.max(value, min), max)
        }

        if(to === 'RGB') return ~~(normalize(value,0,255)) as RGBAV
        else if(to === 'H') {
            value = value % 360
            return (value < 0 ? value + 360 : value) as HUE
        }
        else if(to === 'SL') return normalize(value,0,100) as SATURATION | LIGHTNESS
        else if(to === 'JEB') return normalize(value,0,255) as JEB
        else throw layer8Error(`to is different from allowed values, given was: ${to}`)
    }

    /**
     * Returns a random supercolor
     * @returns A random supercolor
     */
    static random():Color{
        const ran = () => Math.floor(Math.random() * 255) + 1
        const [red, green, blue] = [ran(),ran(),ran()]
        return Color.rgb([red,green,blue])
    }

    /**
     * Returns a random supercolor based on a seed
     * @param seed The seed
     * @returns A random supercolor
     */
    static seed(seed:string):Color{
        const ran = seedrandom(seed)
        const randoms = [ran(),ran(),ran()]
        const [red, green, blue] = randoms.map(rannum => Math.floor(rannum * 255) + 1)
        return Color.rgb([red,green,blue])
    }

    // Private Methods
    private getRGB():RGB{
        const result = rrggbbREGEX.exec(this._code)
        if(!result) throw internalError('Trying to get RGBA values in Color()')

        // [_,rr,bb,gg]
        const red = result[1] as HEX00FF
        const green = result[2] as HEX00FF
        const blue = result[3] as HEX00FF

        return [
            hex(red),
            hex(green),
            hex(blue),
        ]
    }

    private getHSL():HSL{
        const [red, green, blue] = this._rgb
        const [hue, saturation, lightness] = convert.rgb.hsl(red, green, blue)
        return [hue, saturation, lightness]
    }

    private getLuminance():LUMINANCE{
        const rgb = this._rgb
        
        const calculated = rgb.map(value => {
            // Formula: https://www.w3.org/TR/WCAG20/#relativeluminancedef
            value /= 255
            value = value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
            return value
        })

        const luminance = 0.2126 * calculated[0] + 0.7152 * calculated[1] + 0.0722 * calculated[2]
        return luminance
    }

    private YiqFormula():JEB{
        // Formula: https://24ways.org/2010/calculating-color-contrast
        const [red, green, blue] = this._rgb
        const yiq = ((red * 299) + (green * 587) + (blue * 114)) / 1000
        return yiq
    }

    // Getters
    /**
     * Hexadecimal code of the color
     */
    get code():HexadecimalColor{
        return this._code
    }

    /**
     * Red value of the color
     */
    get red():RED{
        return this._rgb[0]
    }

    /**
     * Green value of the color
     */
    get green():GREEN{
        return this._rgb[1]
    }

    /**
     * Blue value of the color
     */
    get blue():BLUE{
        return this._rgb[2]
    }

    /**
     * Array of the 3 colors [red, green, blue]
     */
    get rgb():RGB{
        return this._rgb
    }

    /**
     * Hue of the color
     */
    get hue():HUE{
        return this._hsl[0]
    }

    /**
     * Saturation of the color
     */
    get saturation():SATURATION{
        return this._hsl[1]
    }

    /**
     * Lightness of the color
     */
    get lightness():LIGHTNESS{
        return this._hsl[2]
    }

    /**
     * Array of the 3 hsl values [hue, saturation, lightness]
     */
    get hsl():HSL{
        return this._hsl
    }

    /**
     * Array with the values of the color [cyan, magenta, yellow, black]
     */
    get cmyk():[number,number,number,number]{
        return convert.rgb.cmyk(this._rgb)
    }

    /**
     * Luminance of the color
     */
    get luminance():LUMINANCE{
        return this._luminance
    }

    /**
     * A constant of the color based on YIQ used to get if the color is dark
     */
    get jeb():JEB{
        return this._jeb
    }

    /**
     * Boolean saying if the color is a dark color
     */
    get isDark():boolean{
        return this._dark
    }

    /**
     * Boolean saying if the color is a light color
     */
    get isLight():boolean{
        return !this._dark
    }

    /**
     * Returns white o black, depending of the jeb constant of the color
     * This is to get the best color for a text assuming, that the supercolor is the background color
     */
    get text():HexadecimalColor{
        return this.isDark ? '#ffffff' : '#000000'
    }

    // Public Methods
    /**
     * Makes the color transparent 
     * @param alpha The alpha that the color is going to have, in range [0,100] 0 - trasparent, 100 - opaque
     * @returns A string representing a rgba color 'rgba(255,0,0,.5)' for instance
     * @example
     * htmlElement.style.backgroundColor = supercolor("red").alpha(50) // half-transparent red
     */
    public alpha(alpha:number):RGBA{
        const [red, green, blue] = this.rgb
        alpha /= 100
        return `rgba(${red},${green},${blue},${alpha})`
    }

    /**
     * Multiplies the saturation os a color in factor times
     * @param factor The times you want to multiply the saturation of the color
     * @returns A supercolor
     */
    public saturate(factor:number):Color{
        // eslint-disable-next-line prefer-const
        let [hue, saturation, lightness] = this.hsl
        saturation = saturation * factor
        return Color.hsl([hue, saturation, lightness])
    }

    /**
     * Divivdes the saturation os a color in factor times
     * @param factor The times you want to divide the saturation of the color
     * @returns A supercolor
     */
    public desaturate(factor:number):Color{
        // eslint-disable-next-line prefer-const
        let [hue, saturation, lightness] = this.hsl
        saturation = saturation / factor
        return Color.hsl([hue, saturation, lightness])
    }

    /**
     * Multiplies the lightness os a color in factor times
     * @param factor The times you want to multiply the lightness of the color
     * @returns A supercolor
     */
    public lighten(factor:number):Color{
        // eslint-disable-next-line prefer-const
        let [hue, saturation, lightness] = this.hsl
        lightness = lightness * factor
        return Color.hsl([hue, saturation, lightness])
    }

    /**
     * Divides the lightness os a color in factor times
     * @param factor The times you want to divide the lightness of the color
     * @returns A supercolor
     */
    public darken(factor:number):Color{
        // eslint-disable-next-line prefer-const
        let [hue, saturation, lightness] = this.hsl
        lightness = lightness / factor
        return Color.hsl([hue, saturation, lightness])
    }

    /**
     * Rotates the hue os a color in degrees degress
     * @param degrees The times you want to multiply the saturation of the color
     * @returns A supercolor
     */
    public rotate(degrees:number):Color{
        // eslint-disable-next-line prefer-const
        let [hue, saturation, lightness] = this.hsl
        hue = Color.normalize(hue + degrees,'H')
        return Color.hsl([hue, saturation, lightness])
    }

    // Cromatic circle are 360 degrees in 12 steps, so each step is 30 degrees
    /**
     * Rotates the hue of a color step steps (1 step = 30 degrees)
     * @param steps The steps
     * @returns a supercolor
     */
    public next(steps:number):Color{
        return this.rotate(steps * 30)
    }

    /**
     * Rotates (in the opposite direction) the hue of a color step steps (1 step = 30 degrees)
     * @param steps The steps
     * @returns a supercolor
     */
    public previous(steps:number):Color{
        return this.next(steps * -1)
    }

    // Public methods that not require parameters, so they are properties
    /**
     * The negative of the color
     */
    get negative():Color{
        let [red, green, blue] = this.rgb
        red = Color.normalize(255 - red,'RGB')
        green = Color.normalize(255 - green,'RGB')
        blue = Color.normalize(255 - blue,'RGB')
        return Color.rgb([red, green, blue])
    }

    /**
     * The complementary color (hue rotated 180 degrees)
     */
    get complementary():Color{
        return this.next(6)
    }

    /**
     * The analogous colors
     */
    get analogous():[Color,Color]{
        return [this.previous(1),this.next(1)]
    }

    /**
     * The split complementary colors
     */
    get splitComplementary():[Color,Color]{
        return [this.previous(5),this.next(5)]
    }

    /**
     * The triadic colors
     */
    get triadic():[Color,Color]{
        return [this.previous(4),this.next(4)]
    }

    /**
     * The color a little bit darker
     */
    get hover():Color{
        return this.darken(this._lightdarkconst)
    }

    /**
     * The color a little bit lighter
     */
    get disabled():Color{
        return this.lighten(this._lightdarkconst)
    }

    /**
     * The monocromatic colors
     */
    get monocromatic():[Color,Color]{
        return [this.disabled,this.hover]
    }

    /**
     * The color converted to a grayscale
     */
    get grayscale():Color{
        // Formula: http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
        const [red, green, blue] = this.rgb
		const value = red * 0.3 + green * 0.59 + blue * 0.11;
		return Color.rgb([value, value, value]);
    }

    // Prototype Functions
    /**
     * Converts the supercolor to a string
     * @returns The hexadecimal hexcode
     */
    toString():string{
        return this.code
    }
}

export class GradientableColor extends Color {
    private _gradientWithNegative:Gradient
    private _gradientWithComplementary:Gradient
    private _gradientWithAnalogous:Gradient
    private _gradientWithSplitComplementary:Gradient
    private _gradientWithTriadic:Gradient
    private _gradientWithLighter:Gradient
    private _gradientWithDarker:Gradient
    private _gradientWithMonocromatic:Gradient

    constructor(code:string){
        super(code)
        this._gradientWithAnalogous = this.gAnalogous()
        this._gradientWithComplementary = this.gComplementary()
        this._gradientWithDarker = this.gDarker()
        this._gradientWithLighter = this.gLighter()
        this._gradientWithMonocromatic = this.gMonocromatic()
        this._gradientWithNegative = this.gNegative()
        this._gradientWithSplitComplementary = this.gSplitComplementary()
        this._gradientWithTriadic = this.gTriadic()
    }

    // Private methods that creates the gradient
    private gNegative():Gradient{
        return supergradient([this, this.negative])
    }

    private gComplementary():Gradient{
        return supergradient([this,this.next(3),this.complementary])
    }

    private gAnalogous():Gradient{
        const [prethis, postthis] = this.analogous
        return supergradient([prethis, this, postthis])
    }

    private gSplitComplementary():Gradient{
        const [prethis, postthis] = this.splitComplementary
        return supergradient([prethis, this, postthis])
    }

    private gTriadic():Gradient{
        const [prethis, postthis] = this.triadic
        return supergradient([prethis, this, postthis])
    }

    private gLighter():Gradient{
        return supergradient([this, this.disabled])
    }
    
    private gDarker():Gradient{
        return supergradient([this, this.hover])
    }

    private gMonocromatic():Gradient{
        return supergradient([this.disabled, this, this.hover])
    }

    // Properties (the gradients)

    /**
     * A gradient that contains the color in middle and is surrounded by its analogous
     */
    get gradientWithAnalogous():Gradient{
        return this._gradientWithAnalogous
    }

    /**
     * A gradient that starts with the color and ends with its complementary
     * (There is a middle color in between to avoid crossing the gray)
     */
    get gradientWithComplementary():Gradient{
        return this._gradientWithComplementary
    }

    /**
     * A gradient that starts with the color and ends with a darker version of the color
     */
    get gradientWithDarker():Gradient{
        return this._gradientWithDarker
    }

    /**
     * A gradient that starts with the color and ends with a lighter version of the color
     */
    get gradientWithLighter():Gradient{
        return this._gradientWithLighter
    }

    /**
     * A gradient that contains the color in middle and is surrounded by its lighter and darker versions
     */
    get gradientWithMonocromatic():Gradient{
        return this._gradientWithMonocromatic
    }

    /**
     * A gradient that starts with the color and ends with its negative
     * (There is a middle color in between to avoid crossing the gray)
     */
    get gradientWithNegative():Gradient{
        return this._gradientWithNegative
    }

    /**
     * A gradient that contains the color in middle and is surrounded by its split complementaries
     */
    get gradientWithSplitComplementary():Gradient{
        return this._gradientWithSplitComplementary
    }

    /**
     * A gradient that contains the color in middle and is surrounded by its triadic
     */
    get gradientWithTriadic():Gradient{
        return this._gradientWithTriadic
    }
}

export const supercolor = (code:string):Color => new Color(code)
export const megacolor = (code:string):GradientableColor => new GradientableColor(code)

export const upgradecolor = (codeOrColor: string | Color):Color|GradientableColor => {
    if(codeOrColor instanceof Color){
        return megacolor(codeOrColor.code) as GradientableColor
    }
    else if(typeof codeOrColor === 'string'){
        return supercolor(codeOrColor) as Color
    }
    else{
        throw layer8Error(`Argument in upgradecolor() must be a string or a Color instance, the provided was: ${typeof codeOrColor}`)
    }
}