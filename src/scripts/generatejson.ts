// Import the colors and file
import * as colors from '../colors'
import * as gradients from '../gradients'
import { info, success, error, enter } from '../functions/logs'
import { writeFileSync } from 'fs'

// Convert to JSON
const colorsJSON = JSON.stringify(colors,null,4)
const gradientsJSON = JSON.stringify(gradients,null,4)

try{
    enter()
    info('Creating "colors.json" and "gradients.json" files ...')

    writeFileSync('./dist/colors.json',colorsJSON)
    writeFileSync('./dist/gradients.json', gradientsJSON)
    
    success('"colors.json" and "gradients.json" files created')
}
catch(err){
    error(`${err}`)
}
