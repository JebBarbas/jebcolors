// Import the colors and file
import * as colors from '.'
import { info, success, error } from './functions/logs'
import { writeFileSync } from 'fs'

// Convert to JSON
const json = JSON.stringify(colors)

try{
    console.log('')
    info('Creating "colors.json" file ...')
    writeFileSync('./test/colors.json',json)
    success('"colors.json" file created')
}
catch(err){
    error(`${err}`)
}
