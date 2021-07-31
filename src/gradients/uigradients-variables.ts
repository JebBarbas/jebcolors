// Module to get an uiGradient colors array
// The uiGradients are obtained from the uiGradient webpage: https://uigradients.com/
// and the gradients in uigradients-gradients.ts are obtained fetching this link:
// https://raw.githubusercontent.com/ghosh/uiGradients/master/gradients.json

// Imports
import { uiGradients } from "./uigradients-gradients"
import { clean } from "../functions"

// Exports
/**
 * Gets the array of colors of the given uiGradient
 * @param name The name of the uiGradient you want
 * @returns An array of colors
 * @example
 * getUiGradientColors("Flare") // ["#f12711", "#f5af19"]
 * getUiGradientColors("Witching Hour") // ["#c31432", "#240b36"]
 * getUiGradientColors("    by design") // ["#009FFF", "#ec2F4B"]
 */
export const getUiGradientColors = (name:string):string[] => {
    const wantedGradient = uiGradients.find(gradient => clean(gradient.name) === clean(name))

    if(!wantedGradient){
        throw new Error(`The gradient ${name} doesn't exist in uiGradients, verify that you wrote the name correctly`)
    }

    return wantedGradient.colors
}

/**
 * Alias from getUiGradientColors
 * @param name The name of the uiGradient you want
 * @returns An array of colors
 * @example
 * getUi("Flare") // ["#f12711", "#f5af19"]
 * getUi("Witching Hour") // ["#c31432", "#240b36"]
 * getUi("    by design") // ["#009FFF", "#ec2F4B"]
 */
export const getUi = (name:string):string[] => {
    return getUiGradientColors(name)
}