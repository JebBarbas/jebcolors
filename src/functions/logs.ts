// Module to display in console with some color centain information

// Imports
import 'colors'

// Default Values
const icons = {
    info: 'ℹ',
    warning: '⚠',
    error: 'X',
    success: '✔',
}

// Exports
export const info = (text:string) => {
    const log = `${icons.info} ${text}`.blue
    console.log(log)
}

export const warning = (text:string) => {
    const log = `${icons.warning} ${text}`.yellow
    console.log(log)
}

export const error = (text:string) => {
    const log = `${icons.error} ${text}`.red
    console.log(log)
}

export const success = (text:string) => {
    const log = `${icons.success} ${text}`.green
    console.log(log)
}
