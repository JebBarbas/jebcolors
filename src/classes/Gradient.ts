import type {
    HexadecimalColor
} from './types'

import {
    Color,
    supercolor
} from './Color'

import seedrandom from 'seedrandom'

export class Gradient {
    private _codes: HexadecimalColor[]
    private _colors: Color[]

    constructor(colorsOrcodes:string[] | Color[]){
        this._colors = colorsOrcodes.map((colorOrCode) => {
            let color:Color
            if(colorOrCode instanceof Color){
                color = colorOrCode
            }
            else{
                color = supercolor(colorOrCode)
            }
            return color
        })
        this._codes = this._colors.map(color => color.code)
    }

    // Static Metods
    /**
     * Returns a random supergradient with [2,16] colors (random choice)
     * @returns A random supergradient with [2,16] colors (random choice)
     */
    static random():Gradient{
        const steps = Math.floor(Math.random() * 5) + 1
        const colors = Array(steps).fill(0).map(() => Color.random())
        return supergradient(colors)
    }

    /**
     * Returns a random supergradient based on a seed
     * @param seed The seed
     * @returns A random supergradient based on a seed
     */
    static seed(seed:string):Gradient{
        const ran = seedrandom(seed)
        const steps = Math.floor(ran() * 5) + 1
        const colors = Array(steps).fill(0).map((_,index)=>Color.seed(seed + index))
        return supergradient(colors)
    }

    // Properties
    /**
     * An array of the supercolors of the supergradient
     */
    get colors():Color[]{
        return this._colors
    }

    /**
     * An array of strings of the colors of the supergradient
     */
    get codes():HexadecimalColor[]{
        return this._codes
    }

    // Public methods that not require parameters, properties
    /**
     * The average color of the supergradient (all red, green and blue values
     * are averaged and a new color is created with this)
     */
    get averageColor():Color{
        const colors = this.colors
        let sumred = 0, sumgreen = 0, sumblue = 0
        colors.forEach(color => {
            sumred += color.red
            sumgreen += color.green
            sumblue += color.blue
        })
        sumred /= colors.length
        sumgreen /= colors.length
        sumblue /= colors.length

        return Color.rgb([sumred, sumgreen, sumblue])
    }

    // Prototype
    /**
     * Converts the supergradient to a string
     * @returns A string with all the codes of the gradient, joined by a coma
     */
    toString():string{
        return this.codes.join()
    }
}

export const supergradient = (codes:string[] | Color[]):Gradient => new Gradient(codes)