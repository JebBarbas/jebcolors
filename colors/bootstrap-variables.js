"use strict";
// In this module I save the bootstrap variables to a better manage
// src = https://getbootstrap.com/docs/5.0/utilities/colors/
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrapGrayColors = exports.bootstrapUnusedColors = exports.bootstrapMainColors = void 0;
// Color variables
var blue = "#0d6efd";
var indigo = "#6610f2";
var purple = "#6f42c1";
var pink = "#d63384";
var red = "#dc3545";
var orange = "#fd7e14";
var yellow = "#ffc107";
var green = "#198754";
var teal = "#20c997";
var cyan = "#0dcaf0";
// Gray variables
var white = "#ffffff";
var gray100 = "#f8f9fa";
var gray200 = "#e9ecef";
var gray300 = "#dee2e6";
var gray400 = "#ced4da";
var gray500 = "#adb5bd";
var gray600 = "#6c757d";
var gray700 = "#495057";
var gray800 = "#343a40";
var gray900 = "#212529";
var black = "#000000";
// Final color variables
var primary = blue;
var secondary = gray600;
var success = green;
var info = cyan;
var warning = yellow;
var danger = red;
var light = gray100;
var dark = gray900;
// Exports
exports.bootstrapMainColors = {
    primary: primary,
    secondary: secondary,
    success: success,
    info: info,
    warning: warning,
    danger: danger,
    light: light,
    dark: dark,
};
exports.bootstrapUnusedColors = {
    indigo: indigo,
    purple: purple,
    pink: pink,
    orange: orange,
    teal: teal,
    white: white,
    black: black,
};
exports.bootstrapGrayColors = {
    gray100: gray100,
    gray200: gray200,
    gray300: gray300,
    gray400: gray400,
    gray500: gray500,
    gray600: gray600,
    gray700: gray700,
    gray800: gray800,
    gray900: gray900,
};
