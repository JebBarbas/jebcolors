import { _webMainColorsMixedKeys_ONLY_TO_INTERN_USE } from "../colors/web-variables"

// CALCULATE START //

// CALCULATE END //

// TYPES FUNCTION START //
export type HexadecimalColor = string

export type CodeType = 'rgb' | 'rrggbb' | 'css' |'invalid'

export interface CodeEvaluation {
    valid:boolean,
    type: CodeType
}

export type CSSColorName = keyof typeof _webMainColorsMixedKeys_ONLY_TO_INTERN_USE
// TYPES FUNCTION END //

// TYPES COLOR CLASS START //
export type HEX0F = 
| '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
| 'a' | 'b' | 'c' | 'd' | 'e' | 'f' 
export type HEX00FF = `${HEX0F}${HEX0F}`

export type RGBAV = number
export type RED = RGBAV
export type GREEN = RGBAV
export type BLUE = RGBAV
export type RGB = [RED,GREEN,BLUE]
export type RGBA = `rgba(${RGBAV},${RGBAV},${RGBAV},${RGBAV})`

export type HUE = number
export type SATURATION = number
export type LIGHTNESS = number
export type HSL = [HUE,SATURATION,LIGHTNESS]

export type LUMINANCE = number

export type JEB = number

export interface ContrastObject {
    passes: {
        normal:{
            minimal: boolean,
            perfect: boolean,
        },
        bold:{
            minimal: boolean,
            perfect: boolean
        }
    }
}

export type NormalizationType = 'RGB' | 'H' | 'SL' | 'JEB'
// TYPES COLOR CLASS END //