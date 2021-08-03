"use strict";
// Module to display in console with some color centain information
exports.__esModule = true;
exports.enter = exports.success = exports.error = exports.warning = exports.info = void 0;
// Imports
require("colors");
// Default Values
var icons = {
    info: 'ℹ',
    warning: '⚠',
    error: 'X',
    success: '✔'
};
// Exports
var info = function (text) {
    var log = (icons.info + " " + text).blue;
    console.log(log);
};
exports.info = info;
var warning = function (text) {
    var log = (icons.warning + " " + text).yellow;
    console.log(log);
};
exports.warning = warning;
var error = function (text) {
    var log = (icons.error + " " + text).red;
    console.log(log);
};
exports.error = error;
var success = function (text) {
    var log = (icons.success + " " + text).green;
    console.log(log);
};
exports.success = success;
var enter = function () {
    console.log('');
};
exports.enter = enter;
//# sourceMappingURL=logs.js.map