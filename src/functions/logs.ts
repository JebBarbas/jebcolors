import 'colors'

// Default Values
const icons = {
    info: 'ℹ',
    warning: '⚠',
    error: 'X',
    success: '✔',
}

// Exports
export const info = (...text:unknown[]):void => {
    const log = (`${icons.info} ${text.join(' ')}`).blue;
    console.log(log);
}

export const warning = (...text:unknown[]):void => {
    const log = (`${icons.warning} ${text.join(' ')}`).yellow;
    console.log(log);
}

export const error = (...text:unknown[]):void => {
    const log = (`${icons.error} ${text.join(' ')}`).red;
    console.log(log);
}

export const success = (...text:unknown[]):void => {
    const log = (`${icons.success} ${text.join(' ')}`).green;
    console.log(log);
}

export const enter = ():void => {
    console.log('')
}

//# sourceMappingURL=logs.js.map