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
Object.defineProperty(exports, "__esModule", { value: true });
// First, import all the thing to work correctly
var assert_1 = require("assert");
var color_functions_1 = require("./functions/color-functions");
var logs_1 = require("./functions/logs");
// Import the colors
var colors = __importStar(require("./index"));
// Function to maintain the code cleaner
var entries = function (object) { return Object.entries(object); };
// For saving total colors and total errors
var globalTotalColors = 0;
var globalTotalBadColors = 0;
var arrayOfObjectsWithError = [];
logs_1.info('Starting Tests ...');
console.log('');
entries(colors).forEach(function (entry) {
    var colorGroupKey = entry[0], colorGroup = entry[1];
    logs_1.info("Testing " + colorGroupKey + " ...");
    var localTotalColors = 0;
    var localTotalBadColors = 0;
    entries(colorGroup).forEach(function (entry) {
        var colorKey = entry[0], color = entry[1];
        localTotalColors++;
        globalTotalColors++;
        if (!color_functions_1.isValidHexCode(color)) {
            logs_1.error("Found error in color " + colorKey);
            localTotalBadColors++;
            globalTotalBadColors++;
        }
    });
    if (localTotalBadColors > 0) {
        logs_1.warning("Found " + localTotalBadColors + " bad color(s) in " + colorGroupKey);
        arrayOfObjectsWithError.push(colorGroupKey);
    }
    else {
        logs_1.success("All " + localTotalColors + " colors in " + colorGroupKey + " passed the test");
    }
    console.log('');
});
// If 1 or more bad colors, say that, if not, all good
if (globalTotalBadColors > 0) {
    logs_1.error("Found " + globalTotalBadColors + " bad color(s) in: " + arrayOfObjectsWithError.join() + ". Please see your console for more information");
}
else {
    logs_1.success("All " + globalTotalColors + " colors in module passed the test");
}
assert_1.ok(globalTotalBadColors === 0);
