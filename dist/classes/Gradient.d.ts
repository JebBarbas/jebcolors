import type { HexadecimalColor } from './types';
import { Color } from './Color';
export declare class Gradient {
    private _codes;
    private _colors;
    constructor(colorsOrcodes: string[] | Color[]);
    /**
     * Returns a random supergradient with [2,16] colors (random choice)
     * @returns A random supergradient with [2,16] colors (random choice)
     */
    static random(): Gradient;
    /**
     * Returns a random supergradient based on a seed
     * @param seed The seed
     * @returns A random supergradient based on a seed
     */
    static seed(seed: string): Gradient;
    /**
     * An array of the supercolors of the supergradient
     */
    get colors(): Color[];
    /**
     * An array of strings of the colors of the supergradient
     */
    get codes(): HexadecimalColor[];
    /**
     * The average color of the supergradient (all red, green and blue values
     * are averaged and a new color is created with this)
     */
    get averageColor(): Color;
    /**
     * Converts the supergradient to a string
     * @returns A string with all the codes of the gradient, joined by a coma
     */
    toString(): string;
}
export declare const supergradient: (codes: string[] | Color[]) => Gradient;
