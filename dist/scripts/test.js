"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
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
Object.defineProperty(exports, "__esModule", { value: true });
// First, import all the thing to work correctly
var assert_1 = require("assert");
var logs_1 = require("../functions/logs");
var classes_1 = require("../classes");
// Import the colors
var colors = __importStar(require("../colors"));
var gradients = __importStar(require("../gradients"));
// Function to maintain the code cleaner
var entries = function (object) { return Object.entries(object); };
// Function to exclude keys that I don't want to test
var isBadKey = function (key) {
    var badKeys = ['__esModule', 'default'];
    return badKeys.includes(key);
};
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
        if (isBadKey(colorGroupKey)) {
            return;
        }
        logs_1.info("Testing " + colorGroupKey + " ...");
        var localTotalColors = 0;
        var localTotalBadColors = 0;
        entries(colorGroup).forEach(function (entry) {
            var colorKey = entry[0], color = entry[1];
            localTotalColors++;
            globalTotalColors++;
            if (!classes_1.Color.test(color).valid) {
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
        if (isBadKey(gradientGroupKey)) {
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
                if (!classes_1.Color.test(color).valid) {
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
var testClasses = function () {
    try {
        logs_1.enter();
        logs_1.info('Testing Color and Gradient (random and seed)');
        logs_1.success('Random color:', classes_1.Color.random().code);
        logs_1.success('Seeded color:', classes_1.Color.seed('jebcolors').code);
        logs_1.success('Random gradient:', classes_1.Gradient.random().codes);
        logs_1.success('Seeded gradient:', classes_1.Gradient.seed('jebcolors').codes);
        logs_1.enter();
        logs_1.info('Tesing supercolor and supergradient with css colors');
        logs_1.success(classes_1.supercolor('darkred').code);
        logs_1.success(classes_1.supergradient(['red', 'orange', 'yellow']).codes);
        return true;
    }
    catch (err) {
        logs_1.error('Error testing classes', err);
        return false;
    }
};
assert_1.ok(testColors() && testGradients() && testClasses());
//# sourceMappingURL=test.js.map