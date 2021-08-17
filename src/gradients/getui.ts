import fetch from 'node-fetch'
import { writeFileSync } from 'fs'
import { join } from 'path'
import { isValidHexCode } from '../functions'
import { variablelify } from 'helpscript'

// Consts
const fetchLink = "https://raw.githubusercontent.com/ghosh/uiGradients/master/gradients.json"

// Types
type gradientType = {
    name: string,
    colors: string[]
} 

const literalArray = (arrayOfStrings:string[]):string => {
    let text = '['
    arrayOfStrings.forEach(string => {
        text += `"${string}",`
    })
    text += ']'
    return text
}

const main = async () => {
    const result = await fetch(fetchLink)
    const json:gradientType[] = await result.json()    

    let fileText = `// uiGradients variables, file generated by './getui.js'\n\n// Final gradients\n`
    let colorNames:string[] = []

    json.forEach(gradient => {
        let validGradient = true
        gradient.colors.forEach(color => {
            if(!isValidHexCode(color)){
                validGradient = false
            }
        })

        if(!validGradient) return

        const colorName = variablelify(gradient.name)
        fileText += `const ${colorName} = ${literalArray(gradient.colors)}\n`
        colorNames.push(colorName)
    })

    fileText += `\n// Exports\nexport const uiMainGradients = {${colorNames.join()}}`
    
    // When runed in .js, it will create a typescript file first, then you need to compile again to make the js
    writeFileSync(join(__dirname, '../../src/gradients/uigradients-variables.ts'),fileText)
}
main()