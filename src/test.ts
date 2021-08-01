// Testing module

// First, import all the thing to work correctly
import { ok } from 'assert'
import { isValidHexCode } from './functions'
import { info, warning, error, success } from './functions/logs'

// Import the colors
import * as colors from '.'

// Function to maintain the code cleaner
const entries = (object:object):[string, any][] => Object.entries(object)

// For saving total colors and total errors
let globalTotalColors = 0
let globalTotalBadColors = 0
let arrayOfObjectsWithError:any[] = []

info('Starting Tests ...')
console.log('')

entries(colors).forEach(entry => {
    const [colorGroupKey, colorGroup] = entry

    info(`Testing ${colorGroupKey} ...`)

    let localTotalColors = 0
    let localTotalBadColors = 0

    entries(colorGroup).forEach(entry => {
        const [colorKey, color] = entry

        localTotalColors++
        globalTotalColors++
        
        if(!isValidHexCode(color)){
            error(`Found error in color ${colorKey}`)
            localTotalBadColors++
            globalTotalBadColors++
        }
    })

    if(localTotalBadColors > 0){
        warning(`Found ${localTotalBadColors} bad color(s) in ${colorGroupKey}`)
        arrayOfObjectsWithError.push(colorGroupKey)
    }
    else{
        success(`All ${localTotalColors} colors in ${colorGroupKey} passed the test`)
    }
    console.log('')
})

// If 1 or more bad colors, say that, if not, all good
if(globalTotalBadColors > 0){
    error(`Found ${globalTotalBadColors} bad color(s) in: ${arrayOfObjectsWithError.join()}. Please see your console for more information`)
}
else{
    success(`All ${globalTotalColors} colors in module passed the test`)
}

ok(globalTotalBadColors === 0)

