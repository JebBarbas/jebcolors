// Principal module that exports all things

// Imports
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

export {
    clean,
    deg,
    fixHexCode,
    getBlueValue,
    getGreenValue,
    getRedValue,
    hsl,
    hslToRgb,
    isValidHexCode,
    light,
    normalize,
    normalizeColorValue,
    normalizeHSLValue,
    percentage,
    rgb,
    rgbToHsl,
    isValid,
    isDarkColor,
    validationRegex,
    getRGB,
    contrastTest,
    getRelativeLuminance,
    averageColor,
} from './functions'

export {
    grabientMainGradients,
    instagramMainGradients,
    uiMainGradients,
} from './gradients'

if(typeof window !== 'undefined'){
    const colors = require('./colors')
    const gradients = require('./gradients')
    const functions = require('./functions')
    
    const jebcolors = {
        colors,
        gradients,
        functions,
    };

    (window as any).jebcolors = jebcolors
}