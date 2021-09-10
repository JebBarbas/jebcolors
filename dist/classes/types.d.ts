import { _webMainColorsMixedKeys_ONLY_TO_INTERN_USE } from "../colors/web-variables";
export declare type HexadecimalColor = string;
export declare type CodeType = 'rgb' | 'rrggbb' | 'css' | 'invalid';
export interface CodeEvaluation {
    valid: boolean;
    type: CodeType;
}
export declare type CSSColorName = keyof typeof _webMainColorsMixedKeys_ONLY_TO_INTERN_USE;
export declare type HEX0F = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'a' | 'b' | 'c' | 'd' | 'e' | 'f';
export declare type HEX00FF = `${HEX0F}${HEX0F}`;
export declare type RGBAV = number;
export declare type RED = RGBAV;
export declare type GREEN = RGBAV;
export declare type BLUE = RGBAV;
export declare type RGB = [RED, GREEN, BLUE];
export declare type RGBA = `rgba(${RGBAV},${RGBAV},${RGBAV},${RGBAV})`;
export declare type HUE = number;
export declare type SATURATION = number;
export declare type LIGHTNESS = number;
export declare type HSL = [HUE, SATURATION, LIGHTNESS];
export declare type LUMINANCE = number;
export declare type JEB = number;
export interface ContrastObject {
    passes: {
        normal: {
            minimal: boolean;
            perfect: boolean;
        };
        bold: {
            minimal: boolean;
            perfect: boolean;
        };
    };
}
export declare type NormalizationType = 'RGB' | 'H' | 'SL' | 'JEB';
