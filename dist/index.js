"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
// Principal module that exports all things
Object.defineProperty(exports, "__esModule", { value: true });
exports.upgradecolor = exports.megacolor = exports.supergradient = exports.supercolor = exports.GradientableColor = exports.Gradient = exports.Color = exports.uiMainGradients = exports.instagramMainGradients = exports.grabientMainGradients = exports.webMainColors = exports.socialMainColors = exports.languageMainColors = exports.jebcUnusedColors = exports.jebcMainColors = exports.consoleMainColors = exports.bootstrapUnusedColors = exports.bootstrapMainColors = exports.bootstrapGrayColors = void 0;
// COLORS START //
var colors_1 = require("./colors");
Object.defineProperty(exports, "bootstrapGrayColors", { enumerable: true, get: function () { return colors_1.bootstrapGrayColors; } });
Object.defineProperty(exports, "bootstrapMainColors", { enumerable: true, get: function () { return colors_1.bootstrapMainColors; } });
Object.defineProperty(exports, "bootstrapUnusedColors", { enumerable: true, get: function () { return colors_1.bootstrapUnusedColors; } });
Object.defineProperty(exports, "consoleMainColors", { enumerable: true, get: function () { return colors_1.consoleMainColors; } });
Object.defineProperty(exports, "jebcMainColors", { enumerable: true, get: function () { return colors_1.jebcMainColors; } });
Object.defineProperty(exports, "jebcUnusedColors", { enumerable: true, get: function () { return colors_1.jebcUnusedColors; } });
Object.defineProperty(exports, "languageMainColors", { enumerable: true, get: function () { return colors_1.languageMainColors; } });
Object.defineProperty(exports, "socialMainColors", { enumerable: true, get: function () { return colors_1.socialMainColors; } });
Object.defineProperty(exports, "webMainColors", { enumerable: true, get: function () { return colors_1.webMainColors; } });
// COLORS END
// GRADIENTS START
var gradients_1 = require("./gradients");
Object.defineProperty(exports, "grabientMainGradients", { enumerable: true, get: function () { return gradients_1.grabientMainGradients; } });
Object.defineProperty(exports, "instagramMainGradients", { enumerable: true, get: function () { return gradients_1.instagramMainGradients; } });
Object.defineProperty(exports, "uiMainGradients", { enumerable: true, get: function () { return gradients_1.uiMainGradients; } });
// GRADIENTS END
// COLOR CLASS START //
var classes_1 = require("./classes");
Object.defineProperty(exports, "Color", { enumerable: true, get: function () { return classes_1.Color; } });
Object.defineProperty(exports, "Gradient", { enumerable: true, get: function () { return classes_1.Gradient; } });
Object.defineProperty(exports, "GradientableColor", { enumerable: true, get: function () { return classes_1.GradientableColor; } });
Object.defineProperty(exports, "supercolor", { enumerable: true, get: function () { return classes_1.supercolor; } });
Object.defineProperty(exports, "supergradient", { enumerable: true, get: function () { return classes_1.supergradient; } });
Object.defineProperty(exports, "megacolor", { enumerable: true, get: function () { return classes_1.megacolor; } });
Object.defineProperty(exports, "upgradecolor", { enumerable: true, get: function () { return classes_1.upgradecolor; } });
// COLOR CLASS END //
if (typeof window !== 'undefined') {
    var colors = require('./colors');
    var gradients = require('./gradients');
    var superclasses = require('./classes');
    var jebcolors = {
        colors: colors,
        gradients: gradients,
        superclasses: superclasses,
    };
    window.jebcolors = jebcolors;
}
//# sourceMappingURL=index.js.map