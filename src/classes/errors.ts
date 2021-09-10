import type {
    HexadecimalColor,
    CodeType
} from './types'

class ColorError extends Error{}
class Layer8Error extends Error{}

export const invalidCodeOrNameError = (con:HexadecimalColor, identificator:string):ColorError => new ColorError(`The given code or name isn't a valid hexadecimal code or a valid css color name: ${con}. Module 'jebcolors' trying to do: ${identificator}`)

export const couldntParseError = (con:HexadecimalColor, trying:CodeType, identificator:string):ColorError => new ColorError(`Couldn't parse the hexadecimal code or css color name: ${con}, trying to parse to: ${trying}. Module 'jebcolors' trying to do ${identificator}`)

export const internalError = (identificator:string):ColorError => new ColorError(`An internal error in module 'jebcolors' happened, this is usually an error in the package code. Trying to do: ${identificator}`)

export const layer8Error = (whatBad:string):Layer8Error => new Layer8Error(`The developer made a mistake that ended in an error: ${whatBad}`)