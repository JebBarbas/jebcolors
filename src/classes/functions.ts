import {
    rgbREGEX,
    rrggbbREGEX,
} from './regex'

import {
    _webMainColorsMixedKeys_ONLY_TO_INTERN_USE as cssColors
} from '../colors/web-variables'

import type {
    CSSColorName,
    CodeEvaluation,
    CodeType,
    HexadecimalColor,
    HEX00FF,
    RGBAV,
} from './types'

import {
    invalidCodeOrNameError,
    couldntParseError,
    internalError,
} from './errors'

/**
 * Evaluates the code given to check if its a valid hexadecimal color
 * @param code The hexadecimal color to evaluate
 * @returns An object, where 'valid' says if the code is a valid hexadecimal color and type says
 * what kind of hexadecimal is ('rbg' | 'rgba' | 'rrggbb' | 'rrggbbaa'), can also get a css color name,
 * and the function internaly will run {@link css} to get the hexadecimal color and return a valid code
 */
export const evaluateCode = (code:HexadecimalColor):CodeEvaluation => {
    let valid:boolean
    let type:CodeType

    if(rgbREGEX.test(code)){
        valid = true
        type = 'rgb'
    }
    else if(rrggbbREGEX.test(code)){
        valid = true
        type = 'rrggbb'
    }
    else if(Object.keys(cssColors).includes(code)){
        const cssName = code as CSSColorName
        const newCode = css(cssName)

        if(newCode){
            const cssCodeResult = evaluateCode(newCode)
            valid = cssCodeResult.valid
            type = 'css'
        }
        else{
            valid = false
            type = 'invalid'
        }
    }
    else{
        valid = false
        type = 'invalid'
    }

    return {valid, type}
}

/**
 * Gets the hexadecimal color of the given CSS Color Name
 * @param cssColorName The CSS Color Name (can be lowercased or camelCased) ex:(darkRed and darkred are both true)
 * @returns The hexadecimal color of the CSS Color Name.
 * This code can be runned on vanilla Javascript, so, if the given cssColorName doesn't exist, you'll get
 * the white color
 */
export const css = (cssColorName:CSSColorName):HexadecimalColor => {
    // evaluateCode converts string -> CSSColorName, so, it could be that doesn't exist
    // thats why returns undefined also
    return cssColors[cssColorName] ?? cssColors.white
}

/**
 * Uses the code evaluation and converts a code into a full code
 * #abc passes to #aabbcc.
 * Also converts css color name into a code (if you are sure that the parameter is a css color name
 * better use {@link css} because its shorter)
 * @param code The code in format #abc, #aabbcc or a CSS Color Name
 * @returns 
 */
export const getFullCode = (code:HexadecimalColor):HexadecimalColor => {
    // Removes empty space
    code = code.split('').filter(char => char).join('')

    const validation = evaluateCode(code)
    if(!validation.valid) throw invalidCodeOrNameError(code, 'Validation not passed in getFullCode()')

    let color:string

    switch(validation.type){
        case 'rgb': {
            const result = rgbREGEX.exec(code)
            if(!result) throw couldntParseError(code, 'rgb', 'Parsing rgb getFullCode()')

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [_,r,g,b] = result
            color = `#${r}${r}${g}${g}${b}${b}`
            break
        }
        case 'rrggbb': {
            const result = rrggbbREGEX.exec(code)
            if(!result) throw couldntParseError(code, 'rrggbb', 'Parsing rrggbb getFullCode()')

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [_,rr,gg,bb] = result
            color = `#${rr}${gg}${bb}`
            break
        }
        case 'css':{
            const cssCode = css(code as CSSColorName)
            const result = rrggbbREGEX.exec(cssCode)
            if(!result) throw couldntParseError(`${cssCode} (hex of: ${code})`, 'css', 'Parsing css getFullCode()')

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [_,rr,gg,bb] = result
            color = `#${rr}${gg}${bb}`
            break
        }
        default: {
            throw internalError('Case default in getFullCode()')
        }
    }

    // Returns in lowercase, thats better
    if(rrggbbREGEX.test(color)) return color.toLowerCase()

    throw internalError(`Logical error, color doesn't match in getFullCode()`)
}

/**
 * Converts an hexadecimal digit 00-ff to a int
 * @param hex A hexadecimal value 00-ff
 * @returns A number (integer) between 0-255 (if the given hex is invalid returns 0)
 */
export const hex = (hex:HEX00FF):RGBAV => Math.min(Math.max(Number(`0x${hex}`) || 0 ,0),255)