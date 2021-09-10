"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enter = exports.success = exports.error = exports.warning = exports.info = void 0;
require("colors");
// Default Values
var icons = {
    info: 'ℹ',
    warning: '⚠',
    error: 'X',
    success: '✔',
};
// Exports
var info = function () {
    var text = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        text[_i] = arguments[_i];
    }
    var log = (icons.info + " " + text.join(' ')).blue;
    console.log(log);
};
exports.info = info;
var warning = function () {
    var text = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        text[_i] = arguments[_i];
    }
    var log = (icons.warning + " " + text.join(' ')).yellow;
    console.log(log);
};
exports.warning = warning;
var error = function () {
    var text = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        text[_i] = arguments[_i];
    }
    var log = (icons.error + " " + text.join(' ')).red;
    console.log(log);
};
exports.error = error;
var success = function () {
    var text = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        text[_i] = arguments[_i];
    }
    var log = (icons.success + " " + text.join(' ')).green;
    console.log(log);
};
exports.success = success;
var enter = function () {
    console.log('');
};
exports.enter = enter;
//# sourceMappingURL=logs.js.map
//# sourceMappingURL=logs.js.map