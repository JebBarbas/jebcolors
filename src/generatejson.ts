// Import the colors and file
import * as colors from './colors'
import * as gradients from './gradients'
import { info, success, error, enter } from './functions/logs'
import { writeFileSync } from 'fs'

// Convert to JSON
const colorsJSON = JSON.stringify(colors,null,4)
const gradientsJSON = JSON.stringify(gradients,null,4) // Don't matter if there are functions because in the JSON doesn't appear

try{
    enter()
    info('Creating "colors.json" and "gradients.json" files ...')
    writeFileSync('./test/colors.json',colorsJSON)
    writeFileSync('./test/gradients.json', gradientsJSON)
    success('"colors.json" and "gradients.json" files created')
}
catch(err){
    error(`${err}`)
}
