"use strict";
// Testing module
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
// First, import all the thing to work correctly
var assert_1 = require("assert");
var functions_1 = require("../functions");
var logs_1 = require("../functions/logs");
// Import the colors
var colors = __importStar(require("../colors"));
var gradients = __importStar(require("../gradients"));
var functions = __importStar(require("../functions"));
// Function to maintain the code cleaner
var entries = function (object) { return Object.entries(object); };
// TEST COLORS
var testColors = function () {
    // For saving total colors and total errors
    var globalTotalColors = 0;
    var globalTotalBadColors = 0;
    var colorGroupsWithError = [];
    logs_1.info('Starting Color Tests ...');
    logs_1.enter();
    entries(colors).forEach(function (entry) {
        var colorGroupKey = entry[0], colorGroup = entry[1];
        // If the gradientGroup its __esModule (a boolean), enters here
        if (typeof colorGroup === 'boolean') {
            return;
        }
        logs_1.info("Testing " + colorGroupKey + " ...");
        var localTotalColors = 0;
        var localTotalBadColors = 0;
        entries(colorGroup).forEach(function (entry) {
            var colorKey = entry[0], color = entry[1];
            localTotalColors++;
            globalTotalColors++;
            if (!functions_1.isValid(color, 'hexCode')) {
                logs_1.error("Found error in color " + colorKey);
                localTotalBadColors++;
                globalTotalBadColors++;
            }
        });
        if (localTotalBadColors > 0) {
            logs_1.warning("Found " + localTotalBadColors + " bad color(s) in " + colorGroupKey);
            colorGroupsWithError.push(colorGroupKey);
        }
        else {
            logs_1.success("All " + localTotalColors + " colors in " + colorGroupKey + " passed the test");
        }
        logs_1.enter();
    });
    // If 1 or more bad colors, say that, if not, all good
    if (globalTotalBadColors > 0) {
        logs_1.error("Found " + globalTotalBadColors + " bad color(s) in: " + colorGroupsWithError.join() + ". Please see your console for more information");
        return false;
    }
    else {
        logs_1.success("All " + globalTotalColors + " colors in module passed the test");
        return true;
    }
};
// TEST GRADIENTS
var testGradients = function () {
    // For saving total gradients and total errors
    var globalTotalGradients = 0;
    var globalTotalBadGradients = 0;
    var gradientGroupsWithError = [];
    logs_1.enter();
    logs_1.info('Starting Gradient Tests ...');
    logs_1.enter();
    entries(gradients).forEach(function (entry) {
        var gradientGroupKey = entry[0], gradientGroup = entry[1];
        // If the gradientGroup its __esModule (a boolean), enters here
        if (typeof gradientGroup === 'boolean') {
            return;
        }
        logs_1.info("Testing " + gradientGroupKey + " ...");
        var localTotalGradients = 0;
        var localTotalBadGradients = 0;
        entries(gradientGroup).forEach(function (entry) {
            var gradientKey = entry[0], gradient = entry[1];
            localTotalGradients++;
            globalTotalGradients++;
            var errorExists = false;
            gradient.forEach(function (color) {
                if (!functions_1.isValid(color, 'hexCode')) {
                    logs_1.error("Found error in gradient " + gradientKey + " in color " + color);
                    if (!errorExists) {
                        errorExists = true;
                        localTotalBadGradients++;
                        globalTotalBadGradients++;
                    }
                }
            });
        });
        if (localTotalBadGradients > 0) {
            logs_1.warning("Found " + localTotalBadGradients + " bad gradient(s) in " + gradientGroupKey);
            gradientGroupsWithError.push(gradientGroupKey);
        }
        else {
            logs_1.success("All " + localTotalGradients + " gradients in " + gradientGroupKey + " passed the test");
        }
        logs_1.enter();
    });
    // If 1 or more bad colors, say that, if not, all good
    if (globalTotalBadGradients > 0) {
        logs_1.error("Found " + globalTotalBadGradients + " bad gradient(s) in: " + gradientGroupsWithError.join() + ". Please see your console for more information");
        return false;
    }
    else {
        logs_1.success("All " + globalTotalGradients + " gradients in module passed the test");
        return true;
    }
};
// TEST FUNCTIONS
// As every function is different, you'll need to execute all of them, if some function returns an error, then the 
// catch block will return false, otherwise return true at the end
var testFunctions = function () {
    try {
        logs_1.enter();
        logs_1.info('Starting Functions Tests ...');
        logs_1.enter();
        // Some functions apply others in ladder, so use it to test a lot of functions at once
        /*
            light
                getRGB (getRedValue, getGreenValue, getBlue)
                    fixHexCode
                        isValid
                        clean
        */
        logs_1.info('Testing: light, getRedValue, getGreenValue, getBlueValue, fixHexCode, isValidHexCode, clean ...');
        logs_1.success(functions.light("#cc0000", 1.2));
        logs_1.enter();
        /*
            deg
            hsl
                normalizeHSLValue
                    normalize
                hslToRgb
                rgb
                    normalizeColorValue
        */
        logs_1.info('Testing deg, hsl, normalizeHSLValue, normalize, hslToRgb, rgb, normalizeColorValue ...');
        logs_1.success(functions.hsl(functions.deg(180), 1, 0.5));
        logs_1.enter();
        /*
            isDarkColor
                contrastText
                    getRelativeLuminance
        */
        logs_1.info('Testing isDarkColor, contrastText, getRelativeLuminance ...');
        logs_1.success(functions.isDarkColor("#cc0000").toString());
        logs_1.enter();
        /*
            percentage
        */
        logs_1.info('Testing percentage ...');
        logs_1.success(functions.percentage(100).toString());
        logs_1.enter();
        /*
            rgbToHsl
        */
        logs_1.info('Testing rgbToHsl ...');
        logs_1.success(functions.rgbToHsl(255, 255, 255).toString());
        logs_1.enter();
        logs_1.success('All functions passed the test');
        return true;
    }
    catch (_a) {
        return false;
    }
};
assert_1.ok(testColors() && testGradients() && testFunctions());
//# sourceMappingURL=test.js.map