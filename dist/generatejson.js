"use strict";
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
// Import the colors and file
var colors = __importStar(require("."));
var logs_1 = require("./functions/logs");
var fs_1 = require("fs");
// Convert to JSON
var json = JSON.stringify(colors);
try {
    console.log('');
    logs_1.info('Creating "colors.json" file ...');
    fs_1.writeFileSync('./test/colors.json', json);
    logs_1.success('"colors.json" file created');
}
catch (err) {
    logs_1.error("" + err);
}
//# sourceMappingURL=generatejson.js.map