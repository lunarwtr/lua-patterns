export declare const TOK: Readonly<{
    /**
    * Token '^'
    */
    START: 0;
    /**
    * Token '$'
    */
    END: 1;
    /**
    * Token '.'
    */
    ANY: 2;
    /**
    * Token '*'
    */
    ZEROORMORE: 3;
    /**
    * Token '+'
    */
    ONEORMORE: 4;
    /**
    * Token '-'
    */
    ZEROORMORELAZY: 5;
    /**
    * Token '?'
    */
    ZEROORONE: 6;
    /**
    * Token 'literal'
    */
    CHAR: 7;
    /**
    * Token '('
    */
    LPAR: 8;
    /**
    * Token ')'
    */
    RPAR: 9;
    /**
    * Token '%escaped'
    */
    ESCAPED: 10;
    /**
    * Token '['
    */
    LBRACKET: 11;
    /**
    * Token ']'
    */
    RBRACKET: 12;
    /**
    * Token '^ in set'
    */
    INVERSE: 13;
    /**
    * Token '%class'
    */
    CLASS: 14;
    /**
    * Token '%1'
    */
    CAPTUREREF: 15;
    /**
    * Token '%b'
    */
    BALANCED: 16;
    /**
    * Token '%f'
    */
    FRONTIER: 17;
    /**
    * Token 'error'
    */
    ERROR: 18;
}>;
export declare const TokToStr: string[];
export declare class Token {
    type: number;
    string?: string | undefined;
    constructor(type: number, string?: string | undefined);
}
export declare class Lexer {
    input: string;
    end: number;
    last: number;
    tokens: Token[];
    current: string;
    caret: number;
    constructor(str: string);
    Next(): void;
    Lookahead(): string;
    CheckNext(char: string): boolean;
    IsEnd(): boolean;
    IsLast(): boolean;
    AddToken(type: number, info?: string): void;
    Sub(a: number, b: number): string;
}
export declare const PAT: Readonly<{
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
/**
 * Maps between PAT and string value
 */
export declare const PatToStr: string[];
export declare class Parser {
    tokens: Token[];
    current: Token;
    nodes: PatternObject[];
    levels: PatternObject[];
    captures: PatternObject[];
    private caret;
    private last;
    private end;
    constructor(tokens: Token[]);
    Next(): void;
    IsNextQuantifier(): boolean;
    IsNextRange(): boolean;
    IsNextRPar(): boolean;
    Add(node: PatternObject): void;
    StartCapture(): void;
    EndCapture(): void;
    IsEnd(): boolean;
    IsLast(): boolean;
}
export declare class PatternObject {
    type: number;
    text: any;
    children: PatternObject[];
    constructor(type: number, parent: Parser | PatternObject, text?: any);
    Add(child: PatternObject): void;
}
export declare function PatternsParse(tokens: Token[]): PatternObject[];
export declare function CreateDiv(type: string, parent: HTMLElement, text: string, name: string, description: string): HTMLDivElement;
export declare function CleanBaseDiv(basediv: HTMLElement): void;
export interface PatQualifierNames {
    [tok: number]: string[];
}
export declare const PAT_QUANTIFIER_NAMES: Readonly<PatQualifierNames>;
export interface PatClassNames {
    [tok: string]: string[];
}
export declare const PAT_CLASS_NAMES: Readonly<PatClassNames>;
export declare function PatternsShow(nodes: PatternObject[], parent: HTMLElement, basediv: HTMLElement): void;
export declare function PatternsPrint(input: string, basediv?: HTMLElement | null): void;
