// Main module to export the functions


// Exports
export {
    normalize,
    clean,
    percentage,
    deg,
} from './functions'

export {
    fixHexCode,
    getBlueValue,
    getGreenValue,
    getRedValue,
    hsl,
    hslToRgb,
    light,
    normalizeColorValue,
    normalizeHSLValue,
    rgb,
    rgbToHsl,
    isDarkColor,
    getRGB,
    contrastTest,
    getRelativeLuminance,
    averageColor,
} from './color-functions'

export {
    isValid,
    isValidHexCode,
    validationRegex
} from './validation-functions'