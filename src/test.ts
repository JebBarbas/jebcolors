// Testing module

// First, import all the thing to work correctly
import { ok } from 'assert'
import { isValidHexCode } from './functions'
import { info, warning, error, success, enter } from './functions/logs'

// Import the colors
import * as colors from '.'
import * as gradients from './gradients'
import * as functions from './functions'

// Types
type color = string
type colorsEntry = [string, object]
type colorGroupEntry = [string, color]

type gradient = color[]
type gradientsEntry = [string, object]
type gradientGroupEntry = [string, gradient]

// Function to maintain the code cleaner
const entries = (object:object):[string, any][] => Object.entries(object)

// TEST COLORS
const testColors = ():boolean => {
    // For saving total colors and total errors
    let globalTotalColors = 0
    let globalTotalBadColors = 0
    let colorGroupsWithError:string[] = []

    info('Starting Color Tests ...')
    enter()

    entries(colors).forEach((entry:colorsEntry) => {
        const [colorGroupKey, colorGroup] = entry

        // If the gradientGroup its __esModule (a boolean), enters here
        if(typeof colorGroup === 'boolean'){
            return
        }

        info(`Testing ${colorGroupKey} ...`)

        let localTotalColors = 0
        let localTotalBadColors = 0

        entries(colorGroup).forEach((entry:colorGroupEntry) => {
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
            colorGroupsWithError.push(colorGroupKey)
        }
        else{
            success(`All ${localTotalColors} colors in ${colorGroupKey} passed the test`)
        }
        enter()
    })

    // If 1 or more bad colors, say that, if not, all good
    if(globalTotalBadColors > 0){
        error(`Found ${globalTotalBadColors} bad color(s) in: ${colorGroupsWithError.join()}. Please see your console for more information`)
        return false
    }
    else{
        success(`All ${globalTotalColors} colors in module passed the test`)
        return true
    }
}

// TEST GRADIENTS
const testGradients = ():boolean => {
    // For saving total gradients and total errors
    let globalTotalGradients = 0
    let globalTotalBadGradients = 0
    let gradientGroupsWithError:string[] = []

    enter()
    info('Starting Gradient Tests ...')
    enter()

    entries(gradients).forEach((entry:gradientsEntry) => {
        const [gradientGroupKey, gradientGroup] = entry

        // If the gradientGroup its __esModule (a boolean), enters here
        if(typeof gradientGroup === 'boolean'){
            return
        }

        info(`Testing ${gradientGroupKey} ...`)

        let localTotalGradients = 0
        let localTotalBadGradients = 0

        entries(gradientGroup).forEach((entry:gradientGroupEntry) => {
            const [gradientKey, gradient] = entry

            localTotalGradients++
            globalTotalGradients++
            
            let errorExists = false
            gradient.forEach(color => {
                if(!isValidHexCode(color)){
                    error(`Found error in gradient ${gradientKey} in color ${color}`)

                    if(!errorExists){
                        errorExists = true
                        localTotalBadGradients++
                        globalTotalBadGradients++
                    }
                }
            })
        })

        if(localTotalBadGradients > 0){
            warning(`Found ${localTotalBadGradients} bad gradient(s) in ${gradientGroupKey}`)
            gradientGroupsWithError.push(gradientGroupKey)
        }
        else{
            success(`All ${localTotalGradients} gradients in ${gradientGroupKey} passed the test`)
        }
        enter()
    })

    // If 1 or more bad colors, say that, if not, all good
    if(globalTotalBadGradients > 0){
        error(`Found ${globalTotalBadGradients} bad gradient(s) in: ${gradientGroupsWithError.join()}. Please see your console for more information`)
        return false
    }
    else{
        success(`All ${globalTotalGradients} gradients in module passed the test`)
        return true
    }
}

// TEST FUNCTIONS
// As every function is different, you'll need to execute all of them, if some function returns an error, then the 
// catch block will return false, otherwise return true at the end
const testFunctions = ():boolean => {
    try{
        enter()
        info('Starting Functions Tests ...')
        enter()
        // Some functions apply others in ladder, so use it to test a lot of functions at once

        /*
            light
                getRedValue // getGreenValue // getBlueValue
                    fixHexCode
                        isValidHexCode
                        clean
        */
        info('Testing: light, getRedValue, getGreenValue, getBlueValue, fixHexCode, isValidHexCode, clean ...')
        success(functions.light("#cc0000",1.2))
        enter()

        /*
            deg
            hsl
                normalizeHSLValue
                    normalize
                hslToRgb
                rgb
                    normalizeColorValue
        */
        info('Testing deg, hsl, normalizeHSLValue, normalize, hslToRgb, rgb, normalizeColorValue ...')
        success(functions.hsl(functions.deg(180),1,0.5))
        enter()

        /*
            percentage
        */
        info('Testing percentage ...')
        success(functions.percentage(100).toString())
        enter()

        /*
            rgbToHsl
        */
        info('Testing rgbToHsl ...')
        success(functions.rgbToHsl(255,255,255).toString())
        enter()

        success('All functions passed the test')
        return true
    }
    catch{
        return false
    }
}

ok(testColors() && testGradients() && testFunctions())

