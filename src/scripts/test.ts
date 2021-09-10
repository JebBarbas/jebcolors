/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
// Testing module

// First, import all the thing to work correctly
import { ok } from 'assert'
import { info, warning, error, success, enter } from '../functions/logs'
import { Color, Gradient, supercolor, supergradient } from '../classes'

// Import the colors
import * as colors from '../colors'
import * as gradients from '../gradients'

// Types
type color = string
type colorsEntry = [string, object]
type colorGroupEntry = [string, color]

type gradient = color[]
type gradientsEntry = [string, object]
type gradientGroupEntry = [string, gradient]

// Function to maintain the code cleaner
const entries = (object:object):[string, any][] => Object.entries(object)

// Function to exclude keys that I don't want to test
const isBadKey = (key:string):boolean => {
    const badKeys = ['__esModule','default']
    return badKeys.includes(key)
}

// TEST COLORS
const testColors = ():boolean => {
    // For saving total colors and total errors
    let globalTotalColors = 0
    let globalTotalBadColors = 0
    const colorGroupsWithError:string[] = []

    info('Starting Color Tests ...')
    enter()

    entries(colors).forEach((entry:colorsEntry) => {
        const [colorGroupKey, colorGroup] = entry

        if(isBadKey(colorGroupKey)){
            return
        }

        info(`Testing ${colorGroupKey} ...`)

        let localTotalColors = 0
        let localTotalBadColors = 0

        entries(colorGroup).forEach((entry:colorGroupEntry) => {
            const [colorKey, color] = entry

            localTotalColors++
            globalTotalColors++
            
            if(!Color.test(color).valid){
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
    const gradientGroupsWithError:string[] = []

    enter()
    info('Starting Gradient Tests ...')
    enter()

    entries(gradients).forEach((entry:gradientsEntry) => {
        const [gradientGroupKey, gradientGroup] = entry

        if(isBadKey(gradientGroupKey)){
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
                if(!Color.test(color).valid){
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
const testClasses = ():boolean => {
    try{
        enter()
        info('Testing Color and Gradient (random and seed)')

        success('Random color:', Color.random().code)
        success('Seeded color:', Color.seed('jebcolors').code)

        success('Random gradient:', Gradient.random().codes)
        success('Seeded gradient:', Gradient.seed('jebcolors').codes)

        enter()
        info('Tesing supercolor and supergradient with css colors')

        success(supercolor('darkred').code)
        success(supergradient(['red','orange','yellow']).codes)

        return true
    }
    catch(err){
        error('Error testing classes', err)
        return false
    }
}

ok(testColors() && testGradients() && testClasses())

