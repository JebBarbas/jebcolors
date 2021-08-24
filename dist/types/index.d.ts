/**
 * A string that must match #rgb | #rrggbb (r=red, g=green, b=blue)
 */
export declare type color = string;
/**
 * A number in the range [0-255] (integer)
 */
export declare type numberFrom0To255 = number;
/**
 * A number in the range [0,1] (float)
 */
export declare type numberFrom0To1 = number;
/**
 * An array of {@link color}
 */
export declare type gradient = color[];
/**
 * An object that says if some colors passed what constrast tests
 */
export declare type contrastObject = {
    minimumContrastWithNormalText: boolean;
    perfectContrastWithNormalText: boolean;
    minimumContrastWithBoldText: boolean;
    perfectContrastWithBoldText: boolean;
};
