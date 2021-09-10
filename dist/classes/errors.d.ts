import type { HexadecimalColor, CodeType } from './types';
declare class ColorError extends Error {
}
declare class Layer8Error extends Error {
}
export declare const invalidCodeOrNameError: (con: HexadecimalColor, identificator: string) => ColorError;
export declare const couldntParseError: (con: HexadecimalColor, trying: CodeType, identificator: string) => ColorError;
export declare const internalError: (identificator: string) => ColorError;
export declare const layer8Error: (whatBad: string) => Layer8Error;
export {};
