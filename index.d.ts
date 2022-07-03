/**
 * @param {string} input
 * @returns {Token[]}
 */
export function PatternsLex(input: string): Token[];
/**
 * @param {Token[]} tokens
 * @returns {PatternObject[]}
 */
export function PatternsParse(tokens: Token[]): PatternObject[];
/**
 * @param {PatternObject[]} nodes
 * @param {HTMLElement} parent
 */
export function PatternsShow(nodes: PatternObject[], parent: HTMLElement): void;
/**
 * @param {HTMLElement} input
 */
export function PatternsPrint(input: HTMLElement): void;
export const PAT: Readonly<{
    ERROR: 0;
    CHARS: 1;
    QUANTIFIER: 2;
    ANY: 3;
    START: 4;
    END: 5;
    ESCAPED: 6;
    CLASS: 7;
    CAPTUREREF: 8;
    BALANCED: 9;
    SET: 10;
    CAPTURE: 11;
    FRONTIER: 12;
    RANGE: 13;
    INVERSESET: 14;
    POSITION: 15;
    WARNING: 16;
    NOTE: 17;
    SETCHARS: 18;
}>;
export const PAT_CLASS_NAMES: Readonly<{
    /**
    * Pattern class for "Letters". all letters (Equivalent to [a-zA-Z])
    * tuple of short description, and long description
    */
    a: string[];
    /**
    * Pattern class for "Not letters". all non-letters (Equivalent to [^a-zA-Z])
    * tuple of short description, and long description
    */
    A: string[];
    /**
    * Pattern class for "Controls". all control characters (Such as \"\\t\", \"\\n\", \"\\r\", etc.) (Equivalent to [\\0-\\31])
    * tuple of short description, and long description
    */
    c: string[];
    /**
    * Pattern class for "Not Controls". all non-control characters (Equivalent to [^\\0-\\31])
    * tuple of short description, and long description
    */
    C: string[];
    /**
    * Pattern class for "Digits". all digits (Equivalent to [0-9])
    * tuple of short description, and long description
    */
    d: string[];
    /**
    * Pattern class for "Not digits". all non-digits (Equivalent to [^0-9])
    * tuple of short description, and long description
    */
    D: string[];
    /**
    * Pattern class for "Printable". all printable characters except space (Equivalent to [\\33-\\126])
    * tuple of short description, and long description
    */
    g: string[];
    /**
    * Pattern class for "Not printable". all non-printable characters including space (Equivalent to [^\\33-\\126])
    * tuple of short description, and long description
    */
    G: string[];
    /**
    * Pattern class for "Lowercase". all lowercase letters (Equivalent to [a-z])
    * tuple of short description, and long description
    */
    l: string[];
    /**
    * Pattern class for "Not lowercase". all non-lowercase letters (Equivalent to [^a-z])
    * tuple of short description, and long description
    */
    L: string[];
    /**
    * Pattern class for "Punctuations". all punctuation characters (Equivalent to [!\"#$%&'()*+,-./[\\%]^_`{|}~])
    * tuple of short description, and long description
    */
    p: string[];
    /**
    * Pattern class for "Not punctuations". all non-punctuation characters (Equivalent to [^!\"#$%&'()*+,-./[\\%]^_`{|}~])
    * tuple of short description, and long description
    */
    P: string[];
    /**
    * Pattern class for "Spaces". all white-space characters (Equivalent to [ \\t\\n\\v\\f\\r])
    * tuple of short description, and long description
    */
    s: string[];
    /**
    * Pattern class for "Not spaces". all non-white-space characters (Equivalent to [^ \\t\\n\\v\\f\\r])
    * tuple of short description, and long description
    */
    S: string[];
    /**
    * Pattern class for "Uppercase". all uppercase letters (Equivalent to [A-Z])
    * tuple of short description, and long description
    */
    u: string[];
    /**
    * Pattern class for "Not uppercase". all non-uppercase letters (Equivalent to [^A-Z])
    * tuple of short description, and long description
    */
    U: string[];
    /**
    * Pattern class for "Alphanumerics". all digits, lowercase and uppercase letters (Equivalent to [a-zA-Z0-9])
    * tuple of short description, and long description
    */
    w: string[];
    /**
    * Pattern class for "Not alphanumerics". all non-digits, non-lowercase and non-uppercase letters (Equivalent to [^a-zA-Z0-9])
    * tuple of short description, and long description
    */
    W: string[];
    /**
    * Pattern class for "Hexadecimals". all hexadecimal digits (Equivalent to [0-9a-fA-F]
    * tuple of short description, and long description
    */
    x: string[];
    /**
    * Pattern class for "Not hexadecimals". all non-hexadecimal digits (Equivalent to [^0-9a-fA-F]
    * tuple of short description, and long description
    */
    X: string[];
    /**
    * Pattern class for "\\0 byte". NULL character (0). Deprecated in Lua 5.2.0, use \"\\0\" as regular character.
    * tuple of short description, and long description
    */
    z: string[];
    /**
    * Pattern class for "Not \\0 byte". non-NULL character (0). Deprecated in Lua 5.2.0, use \"[^\\0]\" as regular character.
    * tuple of short description, and long description
    */
    Z: string[];
}>;
export const PAT_QUANTIFIER_NAMES: Readonly<{
    /**
    * ZEROORMORE (`*` - zero or more) - 3-tuple of symbol, short description, and long description
    * Allows to match the pattern zero or more times. This will match the longest sequence.
    */
    3: string[];
    /**
    * ONEORMORE (`+` - one or more) - 3-tuple of symbol, short description, and long description
    * Allows to match the pattern one or more times. This will match the longest sequence.
    */
    4: string[];
    /**
    * ZEROORMORELAZY (`-` - lazy zero or more) - 3-tuple of symbol, short description, and long description
    * Allows to match the pattern zero or more times. This will match the shortest sequence.
    */
    5: string[];
    /**
    * ZEROORONE (`?` - zero or one) - 3-tuple of symbol, short description, and long description
    * Allows to match the pattern zero or one time.
    */
    6: string[];
}>;
export const PatToStr: string[];
declare class Token {
    constructor(tk: any, str: any);
    type: any;
    string: any;
}
declare class PatternObject {
    constructor(type: any, parent: any, text: any);
    type: any;
    text: any;
    children: any[];
    Add(child: any): void;
}
export {};
