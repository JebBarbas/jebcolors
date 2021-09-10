"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hex = exports.getFullCode = exports.css = exports.evaluateCode = void 0;
var regex_1 = require("./regex");
var web_variables_1 = require("../colors/web-variables");
var errors_1 = require("./errors");
/**
 * Evaluates the code given to check if its a valid hexadecimal color
 * @param code The hexadecimal color to evaluate
 * @returns An object, where 'valid' says if the code is a valid hexadecimal color and type says
 * what kind of hexadecimal is ('rbg' | 'rgba' | 'rrggbb' | 'rrggbbaa'), can also get a css color name,
 * and the function internaly will run {@link css} to get the hexadecimal color and return a valid code
 */
var evaluateCode = function (code) {
    var valid;
    var type;
    if (regex_1.rgbREGEX.test(code)) {
        valid = true;
        type = 'rgb';
    }
    else if (regex_1.rrggbbREGEX.test(code)) {
        valid = true;
        type = 'rrggbb';
    }
    else if (Object.keys(web_variables_1._webMainColorsMixedKeys_ONLY_TO_INTERN_USE).includes(code)) {
        var cssName = code;
        var newCode = exports.css(cssName);
        if (newCode) {
            var cssCodeResult = exports.evaluateCode(newCode);
            valid = cssCodeResult.valid;
            type = 'css';
        }
        else {
            valid = false;
            type = 'invalid';
        }
    }
    else {
        valid = false;
        type = 'invalid';
    }
    return { valid: valid, type: type };
};
exports.evaluateCode = evaluateCode;
/**
 * Gets the hexadecimal color of the given CSS Color Name
 * @param cssColorName The CSS Color Name (can be lowercased or camelCased) ex:(darkRed and darkred are both true)
 * @returns The hexadecimal color of the CSS Color Name.
 * This code can be runned on vanilla Javascript, so, if the given cssColorName doesn't exist, you'll get
 * the white color
 */
var css = function (cssColorName) {
    var _a;
    // evaluateCode converts string -> CSSColorName, so, it could be that doesn't exist
    // thats why returns undefined also
    return (_a = web_variables_1._webMainColorsMixedKeys_ONLY_TO_INTERN_USE[cssColorName]) !== null && _a !== void 0 ? _a : web_variables_1._webMainColorsMixedKeys_ONLY_TO_INTERN_USE.white;
};
exports.css = css;
/**
 * Uses the code evaluation and converts a code into a full code
 * #abc passes to #aabbcc.
 * Also converts css color name into a code (if you are sure that the parameter is a css color name
 * better use {@link css} because its shorter)
 * @param code The code in format #abc, #aabbcc or a CSS Color Name
 * @returns
 */
var getFullCode = function (code) {
    // Removes empty space
    code = code.split('').filter(function (char) { return char; }).join('');
    var validation = exports.evaluateCode(code);
    if (!validation.valid)
        throw errors_1.invalidCodeOrNameError(code, 'Validation not passed in getFullCode()');
    var color;
    switch (validation.type) {
        case 'rgb': {
            var result = regex_1.rgbREGEX.exec(code);
            if (!result)
                throw errors_1.couldntParseError(code, 'rgb', 'Parsing rgb getFullCode()');
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            var _ = result[0], r = result[1], g = result[2], b = result[3];
            color = "#" + r + r + g + g + b + b;
            break;
        }
        case 'rrggbb': {
            var result = regex_1.rrggbbREGEX.exec(code);
            if (!result)
                throw errors_1.couldntParseError(code, 'rrggbb', 'Parsing rrggbb getFullCode()');
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            var _ = result[0], rr = result[1], gg = result[2], bb = result[3];
            color = "#" + rr + gg + bb;
            break;
        }
        case 'css': {
            var cssCode = exports.css(code);
            var result = regex_1.rrggbbREGEX.exec(cssCode);
            if (!result)
                throw errors_1.couldntParseError(cssCode + " (hex of: " + code + ")", 'css', 'Parsing css getFullCode()');
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            var _ = result[0], rr = result[1], gg = result[2], bb = result[3];
            color = "#" + rr + gg + bb;
            break;
        }
        default: {
            throw errors_1.internalError('Case default in getFullCode()');
        }
    }
    // Returns in lowercase, thats better
    if (regex_1.rrggbbREGEX.test(color))
        return color.toLowerCase();
    throw errors_1.internalError("Logical error, color doesn't match in getFullCode()");
};
exports.getFullCode = getFullCode;
/**
 * Converts an hexadecimal digit 00-ff to a int
 * @param hex A hexadecimal value 00-ff
 * @returns A number (integer) between 0-255 (if the given hex is invalid returns 0)
 */
var hex = function (hex) { return Math.min(Math.max(Number("0x" + hex) || 0, 0), 255); };
exports.hex = hex;
//# sourceMappingURL=functions.js.map