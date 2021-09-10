/**
 * Used to lowercase a colorgroup and console.log() the result string.
 * The result is something that _webMainColorsLowercased in src/colors/web-variables
 */

// Import the color group you want to lowercase and set it to colorGroup and the name in colorGroupName
import {webMainColors} from '../colors/'
const colorGroup = webMainColors
const colorGroupName = 'webMainColors'

// Types START //
type ColorGroupKey = keyof typeof colorGroup
// Types END //

// Main START //
let key:ColorGroupKey

let text = `const _${colorGroupName}Lowercased = {\n`
for(key in colorGroup){
    text += `\t${key.toLowerCase()}: ${key},\n`
}
text += `}`

console.log(text)
// Main END //