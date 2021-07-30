// Module to display in console with some color centain information

// Imports
import * as colors from 'colors/safe'

// Default Values
const icons = {
    info: 'ℹ',
    warning: '⚠',
    error: 'X',
    success: '✔',
}

// Exports
export const info = (text:string) => {
    const log = colors.blue(`${icons.info} ${text}`)
    console.log(log)
}

export const warning = (text:string) => {
    const log = colors.yellow(`${icons.warning} ${text}`)
    console.log(log)
}

export const error = (text:string) => {
    const log = colors.red(`${icons.error} ${text}`)
    console.log(log)
}

export const success = (text:string) => {
    const log = colors.green(`${icons.success} ${text}`)
    console.log(log)
}
