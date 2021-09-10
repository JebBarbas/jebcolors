/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
// Principal module that exports all things

// COLORS START //
export {
    bootstrapGrayColors,
    bootstrapMainColors,
    bootstrapUnusedColors,

    consoleMainColors,

    jebcMainColors,
    jebcUnusedColors,

    languageMainColors,

    socialMainColors,

    webMainColors,
} from './colors'
// COLORS END

// GRADIENTS START
export {
    grabientMainGradients,
    instagramMainGradients,
    uiMainGradients,
} from './gradients'
// GRADIENTS END

// COLOR CLASS START //
export {
    Color, Gradient, GradientableColor,
    supercolor, supergradient, megacolor, upgradecolor,
} from './classes'

export type {
    HexadecimalColor, CodeType, CodeEvaluation,
    CSSColorName,
    HEX0F, HEX00FF,
    RGBAV, RED, GREEN, BLUE, RGBA, RGB,
    HUE, SATURATION, LIGHTNESS, HSL,
    LUMINANCE,
    JEB,
    ContrastObject,
    NormalizationType,
} from './classes'
// COLOR CLASS END //

if(typeof window !== 'undefined'){
    const colors = require('./colors')
    const gradients = require('./gradients')
    const superclasses = require('./classes')

    
    const jebcolors = {
        colors,
        gradients,
        superclasses,
    };

    (window as any).jebcolors = jebcolors
}