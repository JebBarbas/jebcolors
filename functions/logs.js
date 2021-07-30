"use strict";
// Module to display in console with some color centain information
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
exports.success = exports.error = exports.warning = exports.info = void 0;
// Imports
var colors = __importStar(require("colors/safe"));
// Default Values
var icons = {
    info: 'ℹ',
    warning: '⚠',
    error: 'X',
    success: '✔',
};
// Exports
var info = function (text) {
    var log = colors.blue(icons.info + " " + text);
    console.log(log);
};
exports.info = info;
var warning = function (text) {
    var log = colors.yellow(icons.warning + " " + text);
    console.log(log);
};
exports.warning = warning;
var error = function (text) {
    var log = colors.red(icons.error + " " + text);
    console.log(log);
};
exports.error = error;
var success = function (text) {
    var log = colors.green(icons.success + " " + text);
    console.log(log);
};
exports.success = success;
