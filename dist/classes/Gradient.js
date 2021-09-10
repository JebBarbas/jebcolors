"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supergradient = exports.Gradient = void 0;
var Color_1 = require("./Color");
var seedrandom_1 = __importDefault(require("seedrandom"));
var Gradient = /** @class */ (function () {
    function Gradient(colorsOrcodes) {
        this._colors = colorsOrcodes.map(function (colorOrCode) {
            var color;
            if (colorOrCode instanceof Color_1.Color) {
                color = colorOrCode;
            }
            else {
                color = Color_1.supercolor(colorOrCode);
            }
            return color;
        });
        this._codes = this._colors.map(function (color) { return color.code; });
    }
    // Static Metods
    /**
     * Returns a random supergradient with [2,16] colors (random choice)
     * @returns A random supergradient with [2,16] colors (random choice)
     */
    Gradient.random = function () {
        var steps = Math.floor(Math.random() * 5) + 1;
        var colors = Array(steps).fill(0).map(function () { return Color_1.Color.random(); });
        return exports.supergradient(colors);
    };
    /**
     * Returns a random supergradient based on a seed
     * @param seed The seed
     * @returns A random supergradient based on a seed
     */
    Gradient.seed = function (seed) {
        var ran = seedrandom_1.default(seed);
        var steps = Math.floor(ran() * 5) + 1;
        var colors = Array(steps).fill(0).map(function (_, index) { return Color_1.Color.seed(seed + index); });
        return exports.supergradient(colors);
    };
    Object.defineProperty(Gradient.prototype, "colors", {
        // Properties
        /**
         * An array of the supercolors of the supergradient
         */
        get: function () {
            return this._colors;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Gradient.prototype, "codes", {
        /**
         * An array of strings of the colors of the supergradient
         */
        get: function () {
            return this._codes;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Gradient.prototype, "averageColor", {
        // Public methods that not require parameters, properties
        /**
         * The average color of the supergradient (all red, green and blue values
         * are averaged and a new color is created with this)
         */
        get: function () {
            var colors = this.colors;
            var sumred = 0, sumgreen = 0, sumblue = 0;
            colors.forEach(function (color) {
                sumred += color.red;
                sumgreen += color.green;
                sumblue += color.blue;
            });
            sumred /= colors.length;
            sumgreen /= colors.length;
            sumblue /= colors.length;
            return Color_1.Color.rgb([sumred, sumgreen, sumblue]);
        },
        enumerable: false,
        configurable: true
    });
    // Prototype
    /**
     * Converts the supergradient to a string
     * @returns A string with all the codes of the gradient, joined by a coma
     */
    Gradient.prototype.toString = function () {
        return this.codes.join();
    };
    return Gradient;
}());
exports.Gradient = Gradient;
var supergradient = function (codes) { return new Gradient(codes); };
exports.supergradient = supergradient;
//# sourceMappingURL=Gradient.js.map