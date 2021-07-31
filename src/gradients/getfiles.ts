import fetch from 'node-fetch'
import { writeFileSync } from 'fs'
import { join } from 'path'

// Consts
const fetchLink = "https://raw.githubusercontent.com/ghosh/uiGradients/master/gradients.json"

// Types
type gradientType = {
    name: string,
    colors: string[]
} 

const main = async () => {
    const result = await fetch(fetchLink)
    const json:gradientType[] = await result.json()    

    const gradients = JSON.stringify(json)
    
    const fileText = `export const uiGradients = ${gradients};`

    // Cause is only runned when run in dist, makes a .js file
    writeFileSync(join(__dirname, 'uigradients-gradients.js'),fileText)
}
main()