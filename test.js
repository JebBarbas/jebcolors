// Testing module

// First, import all the color objects

const assert = require('assert')

const {
    bootstrapMainColors,
    bootstrapUnusedColors,
    bootstrapGrayColors,
    jebcMainColors,
    consoleMainColors,
    webMainColors,
} = require('./index')

// Then, use the "..." operator to made an object with ALL the colors (be sure that is not repeated names)

const allColors = {
    ...bootstrapMainColors,
    ...bootstrapUnusedColors, 
    ...bootstrapGrayColors,
    ...jebcMainColors,
    ...consoleMainColors,
    ...webMainColors,
}

// Function to verify if a color is valid, returns a boolean

const isValidColor = (color, name) => {
    const colorLength = 7 // The length of a color string, incluying the "#" character
    const hexValues = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'] // The valid hex characters
    const charArray = color.substr(1).split('') // Puts in an array all the characters of the color except the first one (which must be the "#" character)

    let foundError = false

    const error = (toSay = '') => {
        console.error(`%c Error in color "${name}" (hexcode: ${color}) %c ${toSay}`,'display:block; color:red','display:block; color:red')
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

// Iterates the allColors object and verify all the colors
let totalBadColors = 0
for(color in allColors){
    if(!isValidColor(allColors[color],color)){
        totalBadColors++
    }
}

// If 1 or more bad colors, say that, if not, all good
if(totalBadColors > 0){
    console.error(`%c Found ${totalBadColors} bad color(s)`,'color:red')
}
else{
    console.log(`%c All ${Object.keys(allColors).length} colors are good`,'color:green')
}

assert.ok(totalBadColors === 0)
