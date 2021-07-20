// Principal module

// Imports

const {
    bootstrapMainColors,
    bootstrapUnusedColors,
    bootstrapGrayColors,
} = require('./bootstrap-variables')

const {
    jebcMainColors,
} = require('./jebc-variables')

const {
    consoleMainColors
} = require('./console-variables')

const {
    webMainColors
} = require('./web-variables')

const {
    brandBankColors,
    brandCarColors,
    brandFoodColors,
    brandMarketColors,
    brandPatentedColors,
    brandSocialColors,
    brandTechColors,
    brandWebAndBrandColors
} = require('./brand-variables')

const {
    languageMainColors,
} = require('./language-variables')

// Creation of an array with all the colorObjects.
// This is used in the script "npm test" or if you want to iterate all the colors.
// If you create a new colorObject (like bootstrapMainColors or jebcMainColors), put it here with a name and the imported colorObject (see examples)

const allColors = [
    {name: "Bootstrap Main Colors", colors: bootstrapMainColors},
    {name: "Bootstrap Unused Colors", colors: bootstrapUnusedColors},
    {name: "Bootstrap Gray Colors", colors: bootstrapGrayColors},

    {name: "JebColors Main Colors", colors: jebcMainColors},

    {name: "Console Main Colors", colors: consoleMainColors},

    {name: "Web Main Colors", colors: webMainColors},

    {name: "Brand Bank Colors", colors: brandBankColors},
    {name: "Brand Car Colors", colors: brandCarColors},
    {name: "Brand Food Colors", colors: brandFoodColors},
    {name: "Brand Market Colors", colors: brandMarketColors},
    {name: "Brand Patented Colors", colors: brandPatentedColors},
    {name: "Brand Social Colors", colors: brandSocialColors},
    {name: "Brand Tech Colors", colors: brandTechColors},
    {name: "Brand Web And Brand Colors", colors: brandWebAndBrandColors},

    {name: "Language Main Colors", colors: languageMainColors},
    // {name: "Testing Name", colors: importedColors},
]

// Exports

module.exports = {
    bootstrapMainColors,
    bootstrapUnusedColors,
    bootstrapGrayColors,
    jebcMainColors,
    consoleMainColors,
    webMainColors,
    brandBankColors,
    brandCarColors,
    brandFoodColors,
    brandMarketColors,
    brandPatentedColors,
    brandSocialColors,
    brandTechColors,
    brandWebAndBrandColors,
    languageMainColors,
    allColors
}