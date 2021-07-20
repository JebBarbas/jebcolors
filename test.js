// Testing module

// First, import all the color objects

const assert = require('assert')
const colors = require('colors')
const args = require('minimist')(process.argv.slice(2))

const watchcolors = args['watchcolors'] ? true : false

const {
    allColors
} = require('./index')

// Function to verify if a color is valid, returns a boolean

const isValidColor = (color, name) => {
    const colorLength = 7 // The length of a color string, incluying the "#" character
    const hexValues = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'] // The valid hex characters
    const charArray = color.substr(1).split('') // Puts in an array all the characters of the color except the first one (which must be the "#" character)

    let foundError = false

    const error = (toSay = '') => {
        console.log(`X Error in color "${name}" (hexcode: ${color}): ${toSay}`.red)
    }

    if(!color.startsWith('#')){
        foundError = true
        error('The color must start with the "#" character')
    }

    if(color.length !== colorLength){
        foundError = true
        error(`The color must be ${colorLength} characters long (incluying the "#" character)`)
    }

    charArray.forEach(char => {
        if(!hexValues.includes(char)){
            foundError = true
            error(`The character ${char} is NOT a valid hexadecimal character`)
        }
    })

    return !foundError
}

// For saving total colors and total errors
let globalTotalColors = 0
let globalTotalBadColors = 0
let arrayOfObjectsWithError = []

console.log('ℹ Starting Tests ...'.blue)
console.log('')

// Iterates the allColors array and verify all the inside colors
allColors.forEach(colorObject => {
    console.log(`ℹ Testing ${colorObject.name} ...`.blue)
    let localTotalColors = 0
    let localTotalBadColors = 0
    for(color in colorObject.colors){
        localTotalColors++
        globalTotalColors++
        if(!isValidColor(colorObject.colors[color],color)){
            localTotalBadColors++
            globalTotalBadColors++
        }
    }
    if(localTotalBadColors > 0){
        console.log(`⚠ Found ${localTotalBadColors} bad color(s) in ${colorObject.name}`.yellow)
        arrayOfObjectsWithError.push(colorObject.name)
    }
    else{
        console.log(`✔ All ${localTotalColors} colors in ${colorObject.name} passed the test`.green)
    }
    console.log('')
})

// If 1 or more bad colors, say that, if not, all good
if(globalTotalBadColors > 0){
    console.log(`X Found ${globalTotalBadColors} bad color(s) in: ${arrayOfObjectsWithError.join()}. Please see your console for more information`.red)
}
else{
    console.log(`✔ All ${globalTotalColors} colors in module passed the test`.green)
}

assert.ok(globalTotalBadColors === 0)

if(watchcolors){
    console.log('')
    const fs = require('fs')
    try{
        console.log('ℹ Creating "allColors.json" file ...'.blue)
        fs.writeFileSync('./test/allColors.json',JSON.stringify(allColors))
        console.log('✔ "allColors.json" file created'.green)

        console.log('')
        console.log('ℹ Running "npx serve test" to create a server and see the colors ...'.blue)
    }
    catch(err){
        console.log(`X ${err}`.red)
    }
}