"use strict";
/**
 * Used to lowercase a colorgroup and console.log() the result string.
 * The result is something that _webMainColorsLowercased in src/colors/web-variables
 */
Object.defineProperty(exports, "__esModule", { value: true });
// Import the color group you want to lowercase and set it to colorGroup and the name in colorGroupName
var colors_1 = require("../colors/");
var colorGroup = colors_1.webMainColors;
var colorGroupName = 'webMainColors';
// Types END //
// Main START //
var key;
var text = "const _" + colorGroupName + "Lowercased = {\n";
for (key in colorGroup) {
    text += "\t" + key.toLowerCase() + ": " + key + ",\n";
}
text += "}";
console.log(text);
// Main END //
//# sourceMappingURL=lowercasecolorgroup.js.map