"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upgradecolor = exports.megacolor = exports.supercolor = exports.GradientableColor = exports.Color = void 0;
var functions_1 = require("./functions");
var regex_1 = require("./regex");
var errors_1 = require("./errors");
var color_convert_1 = __importDefault(require("color-convert"));
var Gradient_1 = require("./Gradient");
var seedrandom_1 = __importDefault(require("seedrandom"));
/**
 * Class with basic functions of a color
 * (If you want to add the gradient creator use class GradientableColor)
 */
var Color = /** @class */ (function () {
    function Color(code) {
        this._lightdarkconst = 1.5;
        this._code = functions_1.getFullCode(code);
        this._rgb = this.getRGB();
        this._hsl = this.getHSL();
        this._luminance = this.getLuminance();
        // Didn't know how to name this number, so I named is 'Color Jeb Constant' to be mamon
        this._jeb = this.YiqFormula();
        this._dark = this._jeb < 128;
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
    Color.test = function (code) {
        return functions_1.evaluateCode(code);
    };
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
    Color.contrast = function (color1, color2) {
        if (color1 instanceof Color && color2 instanceof Color) {
            // Formula (Ratio): https://www.w3.org/TR/WCAG20/#contrast-ratiodef
            // Contrast Conditions: https://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast (normal)
            // Contrast Conditions: https://www.w3.org/TR/WCAG20/#visual-audio-contrast7 (bold)
            var maxL = Math.max(color1.luminance, color2.luminance);
            var minL = Math.min(color1.luminance, color2.luminance);
            var ratio = (maxL + 0.05) / (minL + 0.05);
            var contrast = {
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
            };
            return contrast;
        }
        else {
            throw errors_1.layer8Error("Must provide 2 instances of Color, in contrast() in Color(), providen were: " + typeof color1 + " and " + typeof color2);
        }
    };
    /**
     * Creates a new Color instance for the given 3 values
     * @param RGB An array with [red, green, blue] values [0,255]
     * @returns A supercolor (Color instance)
     */
    Color.rgb = function (RGB) {
        var _a = RGB.map(function (rgbav) { return Color.normalize(rgbav, 'RGB'); }), red = _a[0], green = _a[1], blue = _a[2];
        var rrggbb = color_convert_1.default.rgb.hex([red, green, blue]);
        return exports.supercolor("#" + rrggbb);
    };
    /**
     * Creates a new Color instance for the given 3 values
     * @param HSL An array with [hue, saturation, lightness] values [0,360], [0,100] & [0,100]
     * @returns A supercolor (Color instance)
     */
    Color.hsl = function (HSL) {
        var hue = HSL[0], saturation = HSL[1], lightness = HSL[2];
        hue = Color.normalize(hue, 'H');
        saturation = Color.normalize(saturation, 'SL');
        lightness = Color.normalize(lightness, 'SL');
        var rrggbb = color_convert_1.default.hsl.hex([hue, saturation, lightness]);
        return exports.supercolor("#" + rrggbb);
    };
    Color.normalize = function (value, to) {
        var normalize = function (value, min, max) {
            return Math.min(Math.max(value, min), max);
        };
        if (to === 'RGB')
            return ~~(normalize(value, 0, 255));
        else if (to === 'H') {
            value = value % 360;
            return (value < 0 ? value + 360 : value);
        }
        else if (to === 'SL')
            return normalize(value, 0, 100);
        else if (to === 'JEB')
            return normalize(value, 0, 255);
        else
            throw errors_1.layer8Error("to is different from allowed values, given was: " + to);
    };
    /**
     * Returns a random supercolor
     * @returns A random supercolor
     */
    Color.random = function () {
        var ran = function () { return Math.floor(Math.random() * 255) + 1; };
        var _a = [ran(), ran(), ran()], red = _a[0], green = _a[1], blue = _a[2];
        return Color.rgb([red, green, blue]);
    };
    /**
     * Returns a random supercolor based on a seed
     * @param seed The seed
     * @returns A random supercolor
     */
    Color.seed = function (seed) {
        var ran = seedrandom_1.default(seed);
        var randoms = [ran(), ran(), ran()];
        var _a = randoms.map(function (rannum) { return Math.floor(rannum * 255) + 1; }), red = _a[0], green = _a[1], blue = _a[2];
        return Color.rgb([red, green, blue]);
    };
    // Private Methods
    Color.prototype.getRGB = function () {
        var result = regex_1.rrggbbREGEX.exec(this._code);
        if (!result)
            throw errors_1.internalError('Trying to get RGBA values in Color()');
        // [_,rr,bb,gg]
        var red = result[1];
        var green = result[2];
        var blue = result[3];
        return [
            functions_1.hex(red),
            functions_1.hex(green),
            functions_1.hex(blue),
        ];
    };
    Color.prototype.getHSL = function () {
        var _a = this._rgb, red = _a[0], green = _a[1], blue = _a[2];
        var _b = color_convert_1.default.rgb.hsl(red, green, blue), hue = _b[0], saturation = _b[1], lightness = _b[2];
        return [hue, saturation, lightness];
    };
    Color.prototype.getLuminance = function () {
        var rgb = this._rgb;
        var calculated = rgb.map(function (value) {
            // Formula: https://www.w3.org/TR/WCAG20/#relativeluminancedef
            value /= 255;
            value = value <= 0.03928 ? value / 12.92 : Math.pow(((value + 0.055) / 1.055), 2.4);
            return value;
        });
        var luminance = 0.2126 * calculated[0] + 0.7152 * calculated[1] + 0.0722 * calculated[2];
        return luminance;
    };
    Color.prototype.YiqFormula = function () {
        // Formula: https://24ways.org/2010/calculating-color-contrast
        var _a = this._rgb, red = _a[0], green = _a[1], blue = _a[2];
        var yiq = ((red * 299) + (green * 587) + (blue * 114)) / 1000;
        return yiq;
    };
    Object.defineProperty(Color.prototype, "code", {
        // Getters
        /**
         * Hexadecimal code of the color
         */
        get: function () {
            return this._code;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "red", {
        /**
         * Red value of the color
         */
        get: function () {
            return this._rgb[0];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "green", {
        /**
         * Green value of the color
         */
        get: function () {
            return this._rgb[1];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "blue", {
        /**
         * Blue value of the color
         */
        get: function () {
            return this._rgb[2];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "rgb", {
        /**
         * Array of the 3 colors [red, green, blue]
         */
        get: function () {
            return this._rgb;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "hue", {
        /**
         * Hue of the color
         */
        get: function () {
            return this._hsl[0];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "saturation", {
        /**
         * Saturation of the color
         */
        get: function () {
            return this._hsl[1];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "lightness", {
        /**
         * Lightness of the color
         */
        get: function () {
            return this._hsl[2];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "hsl", {
        /**
         * Array of the 3 hsl values [hue, saturation, lightness]
         */
        get: function () {
            return this._hsl;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "cmyk", {
        /**
         * Array with the values of the color [cyan, magenta, yellow, black]
         */
        get: function () {
            return color_convert_1.default.rgb.cmyk(this._rgb);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "luminance", {
        /**
         * Luminance of the color
         */
        get: function () {
            return this._luminance;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "jeb", {
        /**
         * A constant of the color based on YIQ used to get if the color is dark
         */
        get: function () {
            return this._jeb;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "isDark", {
        /**
         * Boolean saying if the color is a dark color
         */
        get: function () {
            return this._dark;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "isLight", {
        /**
         * Boolean saying if the color is a light color
         */
        get: function () {
            return !this._dark;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "text", {
        /**
         * Returns white o black, depending of the jeb constant of the color
         * This is to get the best color for a text assuming, that the supercolor is the background color
         */
        get: function () {
            return this.isDark ? '#ffffff' : '#000000';
        },
        enumerable: false,
        configurable: true
    });
    // Public Methods
    /**
     * Makes the color transparent
     * @param alpha The alpha that the color is going to have, in range [0,100] 0 - trasparent, 100 - opaque
     * @returns A string representing a rgba color 'rgba(255,0,0,.5)' for instance
     * @example
     * htmlElement.style.backgroundColor = supercolor("red").alpha(50) // half-transparent red
     */
    Color.prototype.alpha = function (alpha) {
        var _a = this.rgb, red = _a[0], green = _a[1], blue = _a[2];
        alpha /= 100;
        return "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
    };
    /**
     * Multiplies the saturation os a color in factor times
     * @param factor The times you want to multiply the saturation of the color
     * @returns A supercolor
     */
    Color.prototype.saturate = function (factor) {
        // eslint-disable-next-line prefer-const
        var _a = this.hsl, hue = _a[0], saturation = _a[1], lightness = _a[2];
        saturation = saturation * factor;
        return Color.hsl([hue, saturation, lightness]);
    };
    /**
     * Divivdes the saturation os a color in factor times
     * @param factor The times you want to divide the saturation of the color
     * @returns A supercolor
     */
    Color.prototype.desaturate = function (factor) {
        // eslint-disable-next-line prefer-const
        var _a = this.hsl, hue = _a[0], saturation = _a[1], lightness = _a[2];
        saturation = saturation / factor;
        return Color.hsl([hue, saturation, lightness]);
    };
    /**
     * Multiplies the lightness os a color in factor times
     * @param factor The times you want to multiply the lightness of the color
     * @returns A supercolor
     */
    Color.prototype.lighten = function (factor) {
        // eslint-disable-next-line prefer-const
        var _a = this.hsl, hue = _a[0], saturation = _a[1], lightness = _a[2];
        lightness = lightness * factor;
        return Color.hsl([hue, saturation, lightness]);
    };
    /**
     * Divides the lightness os a color in factor times
     * @param factor The times you want to divide the lightness of the color
     * @returns A supercolor
     */
    Color.prototype.darken = function (factor) {
        // eslint-disable-next-line prefer-const
        var _a = this.hsl, hue = _a[0], saturation = _a[1], lightness = _a[2];
        lightness = lightness / factor;
        return Color.hsl([hue, saturation, lightness]);
    };
    /**
     * Rotates the hue os a color in degrees degress
     * @param degrees The times you want to multiply the saturation of the color
     * @returns A supercolor
     */
    Color.prototype.rotate = function (degrees) {
        // eslint-disable-next-line prefer-const
        var _a = this.hsl, hue = _a[0], saturation = _a[1], lightness = _a[2];
        hue = Color.normalize(hue + degrees, 'H');
        return Color.hsl([hue, saturation, lightness]);
    };
    // Cromatic circle are 360 degrees in 12 steps, so each step is 30 degrees
    /**
     * Rotates the hue of a color step steps (1 step = 30 degrees)
     * @param steps The steps
     * @returns a supercolor
     */
    Color.prototype.next = function (steps) {
        return this.rotate(steps * 30);
    };
    /**
     * Rotates (in the opposite direction) the hue of a color step steps (1 step = 30 degrees)
     * @param steps The steps
     * @returns a supercolor
     */
    Color.prototype.previous = function (steps) {
        return this.next(steps * -1);
    };
    Object.defineProperty(Color.prototype, "negative", {
        // Public methods that not require parameters, so they are properties
        /**
         * The negative of the color
         */
        get: function () {
            var _a = this.rgb, red = _a[0], green = _a[1], blue = _a[2];
            red = Color.normalize(255 - red, 'RGB');
            green = Color.normalize(255 - green, 'RGB');
            blue = Color.normalize(255 - blue, 'RGB');
            return Color.rgb([red, green, blue]);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "complementary", {
        /**
         * The complementary color (hue rotated 180 degrees)
         */
        get: function () {
            return this.next(6);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "analogous", {
        /**
         * The analogous colors
         */
        get: function () {
            return [this.previous(1), this.next(1)];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "splitComplementary", {
        /**
         * The split complementary colors
         */
        get: function () {
            return [this.previous(5), this.next(5)];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "triadic", {
        /**
         * The triadic colors
         */
        get: function () {
            return [this.previous(4), this.next(4)];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "hover", {
        /**
         * The color a little bit darker
         */
        get: function () {
            return this.darken(this._lightdarkconst);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "disabled", {
        /**
         * The color a little bit lighter
         */
        get: function () {
            return this.lighten(this._lightdarkconst);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "monocromatic", {
        /**
         * The monocromatic colors
         */
        get: function () {
            return [this.disabled, this.hover];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "grayscale", {
        /**
         * The color converted to a grayscale
         */
        get: function () {
            // Formula: http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
            var _a = this.rgb, red = _a[0], green = _a[1], blue = _a[2];
            var value = red * 0.3 + green * 0.59 + blue * 0.11;
            return Color.rgb([value, value, value]);
        },
        enumerable: false,
        configurable: true
    });
    // Prototype Functions
    /**
     * Converts the supercolor to a string
     * @returns The hexadecimal hexcode
     */
    Color.prototype.toString = function () {
        return this.code;
    };
    return Color;
}());
exports.Color = Color;
var GradientableColor = /** @class */ (function (_super) {
    __extends(GradientableColor, _super);
    function GradientableColor(code) {
        var _this = _super.call(this, code) || this;
        _this._gradientWithAnalogous = _this.gAnalogous();
        _this._gradientWithComplementary = _this.gComplementary();
        _this._gradientWithDarker = _this.gDarker();
        _this._gradientWithLighter = _this.gLighter();
        _this._gradientWithMonocromatic = _this.gMonocromatic();
        _this._gradientWithNegative = _this.gNegative();
        _this._gradientWithSplitComplementary = _this.gSplitComplementary();
        _this._gradientWithTriadic = _this.gTriadic();
        return _this;
    }
    // Private methods that creates the gradient
    GradientableColor.prototype.gNegative = function () {
        return Gradient_1.supergradient([this, this.negative]);
    };
    GradientableColor.prototype.gComplementary = function () {
        return Gradient_1.supergradient([this, this.next(3), this.complementary]);
    };
    GradientableColor.prototype.gAnalogous = function () {
        var _a = this.analogous, prethis = _a[0], postthis = _a[1];
        return Gradient_1.supergradient([prethis, this, postthis]);
    };
    GradientableColor.prototype.gSplitComplementary = function () {
        var _a = this.splitComplementary, prethis = _a[0], postthis = _a[1];
        return Gradient_1.supergradient([prethis, this, postthis]);
    };
    GradientableColor.prototype.gTriadic = function () {
        var _a = this.triadic, prethis = _a[0], postthis = _a[1];
        return Gradient_1.supergradient([prethis, this, postthis]);
    };
    GradientableColor.prototype.gLighter = function () {
        return Gradient_1.supergradient([this, this.disabled]);
    };
    GradientableColor.prototype.gDarker = function () {
        return Gradient_1.supergradient([this, this.hover]);
    };
    GradientableColor.prototype.gMonocromatic = function () {
        return Gradient_1.supergradient([this.disabled, this, this.hover]);
    };
    Object.defineProperty(GradientableColor.prototype, "gradientWithAnalogous", {
        // Properties (the gradients)
        /**
         * A gradient that contains the color in middle and is surrounded by its analogous
         */
        get: function () {
            return this._gradientWithAnalogous;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GradientableColor.prototype, "gradientWithComplementary", {
        /**
         * A gradient that starts with the color and ends with its complementary
         * (There is a middle color in between to avoid crossing the gray)
         */
        get: function () {
            return this._gradientWithComplementary;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GradientableColor.prototype, "gradientWithDarker", {
        /**
         * A gradient that starts with the color and ends with a darker version of the color
         */
        get: function () {
            return this._gradientWithDarker;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GradientableColor.prototype, "gradientWithLighter", {
        /**
         * A gradient that starts with the color and ends with a lighter version of the color
         */
        get: function () {
            return this._gradientWithLighter;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GradientableColor.prototype, "gradientWithMonocromatic", {
        /**
         * A gradient that contains the color in middle and is surrounded by its lighter and darker versions
         */
        get: function () {
            return this._gradientWithMonocromatic;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GradientableColor.prototype, "gradientWithNegative", {
        /**
         * A gradient that starts with the color and ends with its negative
         * (There is a middle color in between to avoid crossing the gray)
         */
        get: function () {
            return this._gradientWithNegative;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GradientableColor.prototype, "gradientWithSplitComplementary", {
        /**
         * A gradient that contains the color in middle and is surrounded by its split complementaries
         */
        get: function () {
            return this._gradientWithSplitComplementary;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GradientableColor.prototype, "gradientWithTriadic", {
        /**
         * A gradient that contains the color in middle and is surrounded by its triadic
         */
        get: function () {
            return this._gradientWithTriadic;
        },
        enumerable: false,
        configurable: true
    });
    return GradientableColor;
}(Color));
exports.GradientableColor = GradientableColor;
var supercolor = function (code) { return new Color(code); };
exports.supercolor = supercolor;
var megacolor = function (code) { return new GradientableColor(code); };
exports.megacolor = megacolor;
var upgradecolor = function (codeOrColor) {
    if (codeOrColor instanceof Color) {
        return exports.megacolor(codeOrColor.code);
    }
    else if (typeof codeOrColor === 'string') {
        return exports.supercolor(codeOrColor);
    }
    else {
        throw errors_1.layer8Error("Argument in upgradecolor() must be a string or a Color instance, the provided was: " + typeof codeOrColor);
    }
};
exports.upgradecolor = upgradecolor;
//# sourceMappingURL=Color.js.map