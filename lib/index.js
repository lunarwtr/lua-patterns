/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 607:
/***/ (function(__unused_webpack_module, exports) {


var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PatternsPrint = exports.PatternsShow = exports.PAT_CLASS_NAMES = exports.PAT_QUANTIFIER_NAMES = exports.CleanBaseDiv = exports.CreateDiv = exports.PatternsParse = exports.PatternObject = exports.Parser = exports.PatToStr = exports.PAT = exports.Lexer = exports.Token = exports.TokToStr = exports.TOK = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
exports.TOK = Object.freeze({
    /**
    * Token '^'
    */
    START: 0,
    /**
    * Token '$'
    */
    END: 1,
    /**
    * Token '.'
    */
    ANY: 2,
    /**
    * Token '*'
    */
    ZEROORMORE: 3,
    /**
    * Token '+'
    */
    ONEORMORE: 4,
    /**
    * Token '-'
    */
    ZEROORMORELAZY: 5,
    /**
    * Token '?'
    */
    ZEROORONE: 6,
    /**
    * Token 'literal'
    */
    CHAR: 7,
    /**
    * Token '('
    */
    LPAR: 8,
    /**
    * Token ')'
    */
    RPAR: 9,
    /**
    * Token '%escaped'
    */
    ESCAPED: 10,
    /**
    * Token '['
    */
    LBRACKET: 11,
    /**
    * Token ']'
    */
    RBRACKET: 12,
    /**
    * Token '^ in set'
    */
    INVERSE: 13,
    /**
    * Token '%class'
    */
    CLASS: 14,
    /**
    * Token '%1'
    */
    CAPTUREREF: 15,
    /**
    * Token '%b'
    */
    BALANCED: 16,
    /**
    * Token '%f'
    */
    FRONTIER: 17,
    /**
    * Token 'error'
    */
    ERROR: 18,
});
exports.TokToStr = [
    "START",
    "END",
    "ANY",
    "ZEROORMORE",
    "ONEORMORE",
    "ZEROORMORELAZY",
    "ZEROORONE",
    "CHAR",
    "LPAR",
    "RPAR",
    "ESCAPED",
    "LBRACKET",
    "RBRACKET",
    "INVERSE",
    "CLASS",
    "CAPTUREREF",
    "BALANCED",
    "FRONTIER",
];
// debug = console.log
var debug = function (message) {
    var optionalParams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        optionalParams[_i - 1] = arguments[_i];
    }
};
var Token = /** @class */ (function () {
    function Token(type, string) {
        this.type = type;
        this.string = string;
    }
    return Token;
}());
exports.Token = Token;
var Lexer = /** @class */ (function () {
    function Lexer(str) {
        this.input = str;
        this.end = str.length;
        this.last = str.length - 1;
        this.tokens = [];
        this.current = str.charAt(0);
        this.caret = 0;
    }
    Lexer.prototype.Next = function () {
        this.current = this.input.charAt(++this.caret);
    };
    Lexer.prototype.Lookahead = function () {
        return this.input.charAt(this.caret + 1);
    };
    Lexer.prototype.CheckNext = function (char) {
        if (this.current === char) {
            this.Next();
            return true;
        }
        return false;
    };
    Lexer.prototype.IsEnd = function () {
        return this.caret >= this.end;
    };
    Lexer.prototype.IsLast = function () {
        return this.caret === this.last;
    };
    Lexer.prototype.AddToken = function (type, info) {
        this.tokens.push(new Token(type, info));
    };
    Lexer.prototype.Sub = function (a, b) {
        return this.input.substring(a, b);
    };
    return Lexer;
}());
exports.Lexer = Lexer;
function MatchClass(char) {
    switch (char.toLowerCase()) {
        case 'a':
        case 'c':
        case 'd':
        case 'g':
        case 'l':
        case 'p':
        case 's':
        case 'u':
        case 'w':
        case 'x':
        case 'z':
            return true;
        default:
            return false;
    }
}
function ReadQuantity(lex) {
    switch (lex.current) {
        case "+":
            lex.AddToken(exports.TOK.ONEORMORE);
            lex.Next();
            break;
        case "-":
            lex.AddToken(exports.TOK.ZEROORMORELAZY);
            lex.Next();
            break;
        case "*":
            lex.AddToken(exports.TOK.ZEROORMORE);
            lex.Next();
            break;
        case "?":
            lex.AddToken(exports.TOK.ZEROORONE);
            lex.Next();
            break;
    }
}
function ReadEscape(lex) {
    if (lex.IsEnd()) {
        lex.AddToken(exports.TOK.ERROR, "Unfinished escape. Finish \"%\" with class or escape character or use \"%%\" to match \"%\" as character.");
        throw new Error("");
    }
    if (MatchClass(lex.current)) {
        lex.AddToken(exports.TOK.CLASS, lex.current);
    }
    else {
        lex.AddToken(exports.TOK.ESCAPED, lex.current);
    }
    lex.Next();
}
function ReadSet(lex) {
    lex.AddToken(exports.TOK.LBRACKET);
    lex.Next();
    if (lex.CheckNext("^"))
        lex.AddToken(exports.TOK.INVERSE);
    do {
        if (lex.IsEnd()) {
            lex.AddToken(exports.TOK.ERROR, "Missing \"]\" to close set.");
            throw new Error("");
        }
        if (lex.current === "%" && lex.caret < lex.end) {
            lex.Next();
            ReadEscape(lex);
        }
        else {
            lex.AddToken(exports.TOK.CHAR, lex.current);
            lex.Next();
        }
    } while (lex.current !== "]");
    lex.AddToken(exports.TOK.RBRACKET);
    lex.Next();
}
function PatternsLex(input) {
    var lex = new Lexer(input);
    try {
        if (lex.CheckNext("^")) {
            lex.AddToken(exports.TOK.START);
        }
        debug("Str", input);
        debug("Len", input.length);
        while (!lex.IsEnd()) {
            switch (lex.current) {
                case "(":
                    debug("(");
                    lex.AddToken(exports.TOK.LPAR);
                    lex.Next();
                    break;
                case ")":
                    debug(")");
                    lex.AddToken(exports.TOK.RPAR);
                    lex.Next();
                    break;
                case "$":
                    debug("$");
                    if (lex.IsLast()) {
                        lex.AddToken(exports.TOK.END);
                        lex.Next();
                    }
                    else {
                        lex.AddToken(exports.TOK.CHAR, lex.current);
                        lex.Next();
                        ReadQuantity(lex);
                    }
                    break;
                case "%": {
                    lex.Next();
                    debug("%", lex.current);
                    switch (lex.current) {
                        case "b":
                            if (lex.caret + 2 >= lex.end) {
                                lex.AddToken(exports.TOK.ERROR, "Missing characters for \"%b\" pattern. Example: \"%b()\".");
                                throw new Error("");
                            }
                            lex.AddToken(exports.TOK.BALANCED, lex.Sub(lex.caret + 1, lex.caret + 3));
                            lex.Next();
                            lex.Next();
                            lex.Next();
                            break;
                        case "f":
                            lex.Next();
                            if (lex.current !== "[") {
                                lex.AddToken(exports.TOK.ERROR, "Missing \"[\" after \"%f\" in pattern. Example: \"%f[%w]\".");
                                throw new Error("");
                            }
                            lex.AddToken(exports.TOK.FRONTIER);
                            ReadSet(lex);
                            break;
                        case '0':
                        case '1':
                        case '2':
                        case '3':
                        case '4':
                        case '5':
                        case '6':
                        case '7':
                        case '8':
                        case '9':
                            lex.AddToken(exports.TOK.CAPTUREREF, lex.current);
                            lex.Next();
                            break;
                        default:
                            ReadEscape(lex);
                            ReadQuantity(lex);
                            break;
                    }
                    break;
                }
                case "[":
                    debug("[");
                    ReadSet(lex);
                    ReadQuantity(lex);
                    break;
                case ".":
                    debug(".");
                    lex.AddToken(exports.TOK.ANY);
                    lex.Next();
                    ReadQuantity(lex);
                    break;
                default:
                    debug("char", lex.current);
                    lex.AddToken(exports.TOK.CHAR, lex.current);
                    lex.Next();
                    ReadQuantity(lex);
                    break;
            }
        }
    }
    catch (e) {
        if (e.message.length > 0) {
            debug(e.name + ": " + e.message);
            lex.AddToken(exports.TOK.ERROR, "Lexer error: " + e.message);
        }
    }
    return lex.tokens;
}
exports.PAT = Object.freeze({
    ERROR: 0,
    CHARS: 1,
    QUANTIFIER: 2,
    ANY: 3,
    START: 4,
    END: 5,
    ESCAPED: 6,
    CLASS: 7,
    CAPTUREREF: 8,
    BALANCED: 9,
    SET: 10,
    CAPTURE: 11,
    FRONTIER: 12,
    RANGE: 13,
    INVERSESET: 14,
    POSITION: 15,
    WARNING: 16,
    NOTE: 17,
    SETCHARS: 18,
});
/**
 * Maps between PAT and string value
 */
exports.PatToStr = [
    "ERROR",
    "CHARS",
    "QUANTIFIER",
    "ANY",
    "START",
    "END",
    "ESCAPED",
    "CLASS",
    "CAPTUREREF",
    "BALANCED",
    "SET",
    "CAPTURE",
    "FRONTIER",
    "RANGE",
    "INVERSESET",
    "POSITION",
    "WARNING",
    "NOTE",
    "SETCHARS",
];
var Parser = /** @class */ (function () {
    function Parser(tokens) {
        this.tokens = tokens;
        this.caret = 0;
        this.last = tokens.length - 1;
        this.end = tokens.length;
        this.current = tokens[0];
        this.nodes = [];
        this.levels = [];
        this.captures = [];
    }
    Parser.prototype.Next = function () {
        this.current = this.tokens[++this.caret];
    };
    Parser.prototype.IsNextQuantifier = function () {
        if (this.IsLast())
            return false;
        var token = this.tokens[this.caret + 1];
        switch (token.type) {
            case exports.TOK.ZEROORMORE:
            case exports.TOK.ONEORMORE:
            case exports.TOK.ZEROORMORELAZY:
            case exports.TOK.ZEROORONE:
                return true;
            default:
                return false;
        }
    };
    Parser.prototype.IsNextRange = function () {
        if (this.caret + 2 >= this.end)
            return false;
        var token = this.tokens[this.caret + 1];
        var token2 = this.tokens[this.caret + 2];
        if (token.type === exports.TOK.CHAR && token.string === "-" && token2.type === exports.TOK.CHAR)
            return true;
        return false;
    };
    Parser.prototype.IsNextRPar = function () {
        if (this.IsLast())
            return false;
        return this.tokens[this.caret + 1].type === exports.TOK.RPAR;
    };
    Parser.prototype.Add = function (node) {
        if (this.levels.length === 0) {
            this.nodes.push(node);
        }
        else {
            this.levels[this.levels.length - 1].Add(node);
        }
    };
    Parser.prototype.StartCapture = function () {
        var capture = new PatternObject(exports.PAT.CAPTURE, this, this.captures.length + 1);
        this.captures.push(capture);
        this.levels.push(capture);
    };
    Parser.prototype.EndCapture = function () {
        this.levels.pop();
    };
    Parser.prototype.IsEnd = function () {
        return this.caret >= this.end;
    };
    Parser.prototype.IsLast = function () {
        return this.caret === this.last;
    };
    return Parser;
}());
exports.Parser = Parser;
var PatternObject = /** @class */ (function () {
    function PatternObject(type, parent, text) {
        this.type = type;
        this.text = text;
        this.children = [];
        parent.Add(this);
    }
    PatternObject.prototype.Add = function (child) {
        this.children.push(child);
    };
    return PatternObject;
}());
exports.PatternObject = PatternObject;
function CheckQuantifier(par, parent) {
    if (par.IsEnd())
        return;
    switch (par.current.type) {
        case exports.TOK.ZEROORMORE:
        case exports.TOK.ONEORMORE:
        case exports.TOK.ZEROORMORELAZY:
        case exports.TOK.ZEROORONE:
            new PatternObject(exports.PAT.QUANTIFIER, parent, par.current.type);
            if (parent.type === exports.PAT.CHARS && parent.text.charCodeAt(0) > 255)
                new PatternObject(exports.PAT.WARNING, parent, "Character \"" + parent.text + "\" (" + parent.text.charCodeAt(0) + ") is outside ASCII range. It will be interpreted incorrectly (as separate parts of the symbol).");
            par.Next();
            return true;
        default:
            return;
    }
}
function MakeString(par) {
    var string = new PatternObject(exports.PAT.CHARS, par, "");
    do {
        string.text += par.current.string;
        par.Next();
    } while (!par.IsEnd() && par.current.type === exports.TOK.CHAR && !par.IsNextQuantifier());
    CheckQuantifier(par, string);
}
function MakeSet(par, parent) {
    var set;
    par.Next();
    if (par.current.type === exports.TOK.INVERSE) {
        set = new PatternObject(exports.PAT.INVERSESET, parent ? parent : par);
        par.Next();
    }
    else {
        set = new PatternObject(exports.PAT.SET, parent ? parent : par);
    }
    do {
        switch (par.current.type) {
            case exports.TOK.CLASS:
                new PatternObject(exports.PAT.CLASS, set, par.current.string);
                par.Next();
                break;
            case exports.TOK.CHAR:
                if (par.IsNextRange()) {
                    var string = par.current.string || '';
                    par.Next();
                    par.Next();
                    new PatternObject(exports.PAT.RANGE, set, string + par.current.string);
                    if (string.charCodeAt(0) > 255 || (par.current.string.charCodeAt(0) > 255))
                        new PatternObject(exports.PAT.WARNING, set, "Range \"" + string + "\" (" + string.charCodeAt(0) + ") - \"" + par.current.string + "\" (" + par.current.string.charCodeAt(0) + ") is outside ASCII range. It will be interpreted incorrectly (as separate parts of the symbol).");
                    par.Next();
                }
                else {
                    var string = new PatternObject(exports.PAT.SETCHARS, set, par.current.string);
                    if (par.current.string.charCodeAt(0) > 255)
                        new PatternObject(exports.PAT.WARNING, set, "Character \"" + par.current.string + "\" (" + par.current.string.charCodeAt(0) + ") is outside ASCII range. It will be interpreted incorrectly (as separate parts of the symbol).");
                    par.Next();
                }
                break;
            case exports.TOK.ESCAPED:
                new PatternObject(exports.PAT.ESCAPED, set, par.current.string);
                if (par.current.string.charCodeAt(0) > 255)
                    new PatternObject(exports.PAT.WARNING, set, "Character \"" + par.current.string + "\" (" + par.current.string.charCodeAt(0) + ") is outside ASCII range. It will be interpreted incorrectly (as separate parts of the symbol).");
                par.Next();
                break;
            case exports.TOK.ERROR:
                new PatternObject(exports.PAT.ERROR, set, par.current.string);
                par.Next();
                return;
            default:
                console.log("???", par.current.type);
                par.Next();
                break;
        }
    } while (par.current.type !== exports.TOK.RBRACKET);
    par.Next();
    CheckQuantifier(par, set);
}
function PatternsParse(tokens) {
    var par = new Parser(tokens);
    try {
        while (!par.IsEnd()) {
            switch (par.current.type) {
                case exports.TOK.ANY:
                    {
                        debug(".");
                        var obj = new PatternObject(exports.PAT.ANY, par);
                        par.Next();
                        CheckQuantifier(par, obj);
                        if (obj.children[0] && obj.children[0].type === exports.PAT.QUANTIFIER && (obj.children[0].text === exports.TOK.ZEROORMORE || obj.children[0].text === exports.TOK.ONEORMORE)) {
                            new PatternObject(exports.PAT.NOTE, obj, "Matching any characters with \"+\" or \"*\" quantifiers may fail your pattern. They match the longest sequence, meaning anything after this pattern won't be matched.");
                        }
                    }
                    break;
                case exports.TOK.CHAR:
                    {
                        debug("char");
                        MakeString(par);
                    }
                    break;
                case exports.TOK.ESCAPED:
                    {
                        debug("escaped");
                        var obj = new PatternObject(exports.PAT.ESCAPED, par, par.current.string);
                        if (par.current.string.charCodeAt(0) > 255)
                            new PatternObject(exports.PAT.WARNING, obj, "Character \"" + par.current.string + "\" (" + par.current.string.charCodeAt(0) + ") is outside ASCII range. It will be interpreted incorrectly (as separate parts of the symbol).");
                        par.Next();
                        CheckQuantifier(par, obj);
                    }
                    break;
                case exports.TOK.LBRACKET:
                    {
                        debug("[");
                        MakeSet(par);
                    }
                    break;
                case exports.TOK.CLASS:
                    {
                        debug("class");
                        var obj = new PatternObject(exports.PAT.CLASS, par, par.current.string);
                        par.Next();
                        CheckQuantifier(par, obj);
                    }
                    break;
                case exports.TOK.LPAR:
                    {
                        debug("(");
                        if (par.IsNextRPar()) {
                            par.captures.push(new PatternObject(exports.PAT.POSITION, par, par.captures.length + 1));
                            par.Next();
                            par.Next();
                        }
                        else {
                            par.StartCapture();
                        }
                        par.Next();
                    }
                    break;
                case exports.TOK.RPAR:
                    {
                        debug(")");
                        par.EndCapture();
                        par.Next();
                    }
                    break;
                case exports.TOK.CAPTUREREF:
                    {
                        debug("Captureref");
                        var obj = new PatternObject(exports.PAT.CAPTUREREF, par, par.current.string);
                        var ref = parseInt(par.current.string, 10);
                        if (par.current.string === "0") {
                            new PatternObject(exports.PAT.NOTE, obj, "Reference for capture #0 is available only in string.gsub.");
                        }
                        else if (par.captures.length < ref) {
                            new PatternObject(exports.PAT.WARNING, obj, "Reference for capture #" + par.current.string + " is not found.");
                        }
                        else if (par.captures[ref - 1].type === exports.PAT.POSITION) {
                            new PatternObject(exports.PAT.NOTE, obj, "References for position captures are available only in string.gsub.");
                        }
                        par.Next();
                    }
                    break;
                case exports.TOK.BALANCED:
                    {
                        debug("balanced");
                        new PatternObject(exports.PAT.BALANCED, par, par.current.string);
                        par.Next();
                    }
                    break;
                case exports.TOK.FRONTIER:
                    {
                        debug("%f");
                        var f = new PatternObject(exports.PAT.FRONTIER, par);
                        par.Next();
                        MakeSet(par, f);
                    }
                    break;
                case exports.TOK.ERROR:
                    {
                        new PatternObject(exports.PAT.ERROR, par, par.current.string);
                        par.Next();
                    }
                    break;
                case exports.TOK.START:
                    {
                        debug("^");
                        new PatternObject(exports.PAT.START, par);
                        par.Next();
                    }
                    break;
                case exports.TOK.END:
                    {
                        debug("$");
                        new PatternObject(exports.PAT.END, par);
                        par.Next();
                    }
                    break;
                default:
                    {
                        debug("unknown", par.current);
                        new PatternObject(exports.PAT.ERROR, par, "Unknown pattern, check console.");
                        par.Next();
                    }
                    break;
            }
        }
        if (par.levels.length !== 0)
            throw new Error("Unfinished capture #" + par.captures.length + ". \")\" is missing.");
    }
    catch (e) {
        console.log(e.name + ": " + e.message);
        par.levels.length = 0;
        new PatternObject(exports.PAT.ERROR, par, "Parser error: " + e.message);
    }
    return par.nodes;
}
exports.PatternsParse = PatternsParse;
function CreateDiv(type, parent, text, name, description) {
    var _a;
    var element = document.createElement("div");
    var p = document.createElement("a");
    p.className = "input";
    p.appendChild(document.createTextNode(text));
    var nname = document.createElement("a");
    nname.className = "name";
    nname.appendChild(document.createTextNode(name));
    var ndescription = document.createElement("a");
    ndescription.className = "description";
    ndescription.appendChild(document.createTextNode(description));
    (_a = element.classList).add.apply(_a, __spreadArray(["token"], type.split(" "), false));
    element.appendChild(p);
    element.appendChild(nname);
    element.appendChild(ndescription);
    parent.appendChild(element);
    return element;
}
exports.CreateDiv = CreateDiv;
function CleanBaseDiv(basediv) {
    if (!basediv)
        return;
    while (basediv.firstChild) {
        basediv.removeChild(basediv.firstChild);
    }
}
exports.CleanBaseDiv = CleanBaseDiv;
;
exports.PAT_QUANTIFIER_NAMES = Object.freeze((_a = {},
    /**
    * ZEROORMORE (`*` - zero or more) - 3-tuple of symbol, short description, and long description
    * Allows to match the pattern zero or more times. This will match the longest sequence.
    */
    _a[exports.TOK.ZEROORMORE] = ["*", "zero or more", "Allows to match the pattern zero or more times. This will match the longest sequence."],
    /**
    * ONEORMORE (`+` - one or more) - 3-tuple of symbol, short description, and long description
    * Allows to match the pattern one or more times. This will match the longest sequence.
    */
    _a[exports.TOK.ONEORMORE] = ["+", "one or more", "Allows to match the pattern one or more times. This will match the longest sequence."],
    /**
    * ZEROORMORELAZY (`-` - lazy zero or more) - 3-tuple of symbol, short description, and long description
    * Allows to match the pattern zero or more times. This will match the shortest sequence.
    */
    _a[exports.TOK.ZEROORMORELAZY] = ["-", "lazy zero or more", "Allows to match the pattern zero or more times. This will match the shortest sequence."],
    /**
    * ZEROORONE (`?` - zero or one) - 3-tuple of symbol, short description, and long description
    * Allows to match the pattern zero or one time.
    */
    _a[exports.TOK.ZEROORONE] = ["?", "zero or one", "Allows to match the pattern zero or one time."],
    _a));
;
exports.PAT_CLASS_NAMES = Object.freeze((_b = {},
    /**
    * Pattern class for "Letters". all letters (Equivalent to [a-zA-Z])
    * tuple of short description, and long description
    */
    _b["a"] = ["Letters", "all letters (Equivalent to [a-zA-Z])"],
    /**
    * Pattern class for "Not letters". all non-letters (Equivalent to [^a-zA-Z])
    * tuple of short description, and long description
    */
    _b["A"] = ["Not letters", "all non-letters (Equivalent to [^a-zA-Z])"],
    /**
    * Pattern class for "Controls". all control characters (Such as \"\\t\", \"\\n\", \"\\r\", etc.) (Equivalent to [\\0-\\31])
    * tuple of short description, and long description
    */
    _b["c"] = ["Controls", "all control characters (Such as \"\\t\", \"\\n\", \"\\r\", etc.) (Equivalent to [\\0-\\31])"],
    /**
    * Pattern class for "Not Controls". all non-control characters (Equivalent to [^\\0-\\31])
    * tuple of short description, and long description
    */
    _b["C"] = ["Not Controls", "all non-control characters (Equivalent to [^\\0-\\31])"],
    /**
    * Pattern class for "Digits". all digits (Equivalent to [0-9])
    * tuple of short description, and long description
    */
    _b["d"] = ["Digits", "all digits (Equivalent to [0-9])"],
    /**
    * Pattern class for "Not digits". all non-digits (Equivalent to [^0-9])
    * tuple of short description, and long description
    */
    _b["D"] = ["Not digits", "all non-digits (Equivalent to [^0-9])"],
    /**
    * Pattern class for "Printable". all printable characters except space (Equivalent to [\\33-\\126])
    * tuple of short description, and long description
    */
    _b["g"] = ["Printable", "all printable characters except space (Equivalent to [\\33-\\126])"],
    /**
    * Pattern class for "Not printable". all non-printable characters including space (Equivalent to [^\\33-\\126])
    * tuple of short description, and long description
    */
    _b["G"] = ["Not printable", "all non-printable characters including space (Equivalent to [^\\33-\\126])"],
    /**
    * Pattern class for "Lowercase". all lowercase letters (Equivalent to [a-z])
    * tuple of short description, and long description
    */
    _b["l"] = ["Lowercase", "all lowercase letters (Equivalent to [a-z])"],
    /**
    * Pattern class for "Not lowercase". all non-lowercase letters (Equivalent to [^a-z])
    * tuple of short description, and long description
    */
    _b["L"] = ["Not lowercase", "all non-lowercase letters (Equivalent to [^a-z])"],
    /**
    * Pattern class for "Punctuations". all punctuation characters (Equivalent to [!\"#$%&'()*+,-./[\\%]^_`{|}~])
    * tuple of short description, and long description
    */
    _b["p"] = ["Punctuations", "all punctuation characters (Equivalent to [!\"#$%&'()*+,-./[\\%]^_`{|}~])"],
    /**
    * Pattern class for "Not punctuations". all non-punctuation characters (Equivalent to [^!\"#$%&'()*+,-./[\\%]^_`{|}~])
    * tuple of short description, and long description
    */
    _b["P"] = ["Not punctuations", "all non-punctuation characters (Equivalent to [^!\"#$%&'()*+,-./[\\%]^_`{|}~])"],
    /**
    * Pattern class for "Spaces". all white-space characters (Equivalent to [ \\t\\n\\v\\f\\r])
    * tuple of short description, and long description
    */
    _b["s"] = ["Spaces", "all white-space characters (Equivalent to [ \\t\\n\\v\\f\\r])"],
    /**
    * Pattern class for "Not spaces". all non-white-space characters (Equivalent to [^ \\t\\n\\v\\f\\r])
    * tuple of short description, and long description
    */
    _b["S"] = ["Not spaces", "all non-white-space characters (Equivalent to [^ \\t\\n\\v\\f\\r])"],
    /**
    * Pattern class for "Uppercase". all uppercase letters (Equivalent to [A-Z])
    * tuple of short description, and long description
    */
    _b["u"] = ["Uppercase", "all uppercase letters (Equivalent to [A-Z])"],
    /**
    * Pattern class for "Not uppercase". all non-uppercase letters (Equivalent to [^A-Z])
    * tuple of short description, and long description
    */
    _b["U"] = ["Not uppercase", "all non-uppercase letters (Equivalent to [^A-Z])"],
    /**
    * Pattern class for "Alphanumerics". all digits, lowercase and uppercase letters (Equivalent to [a-zA-Z0-9])
    * tuple of short description, and long description
    */
    _b["w"] = ["Alphanumerics", "all digits, lowercase and uppercase letters (Equivalent to [a-zA-Z0-9])"],
    /**
    * Pattern class for "Not alphanumerics". all non-digits, non-lowercase and non-uppercase letters (Equivalent to [^a-zA-Z0-9])
    * tuple of short description, and long description
    */
    _b["W"] = ["Not alphanumerics", "all non-digits, non-lowercase and non-uppercase letters (Equivalent to [^a-zA-Z0-9])"],
    /**
    * Pattern class for "Hexadecimals". all hexadecimal digits (Equivalent to [0-9a-fA-F]
    * tuple of short description, and long description
    */
    _b["x"] = ["Hexadecimals", "all hexadecimal digits (Equivalent to [0-9a-fA-F]"],
    /**
    * Pattern class for "Not hexadecimals". all non-hexadecimal digits (Equivalent to [^0-9a-fA-F]
    * tuple of short description, and long description
    */
    _b["X"] = ["Not hexadecimals", "all non-hexadecimal digits (Equivalent to [^0-9a-fA-F]"],
    /**
    * Pattern class for "\\0 byte". NULL character (0). Deprecated in Lua 5.2.0, use \"\\0\" as regular character.
    * tuple of short description, and long description
    */
    _b["z"] = ["\\0 byte", "NULL character (0). Deprecated in Lua 5.2.0, use \"\\0\" as regular character."],
    /**
    * Pattern class for "Not \\0 byte". non-NULL character (0). Deprecated in Lua 5.2.0, use \"[^\\0]\" as regular character.
    * tuple of short description, and long description
    */
    _b["Z"] = ["Not \\0 byte", "non-NULL character (0). Deprecated in Lua 5.2.0, use \"[^\\0]\" as regular character."],
    _b));
function PatternsShow(nodes, parent, basediv) {
    try {
        for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
            var node = nodes_1[_i];
            switch (node.type) {
                case exports.PAT.CHARS:
                    {
                        var len = node.text.length;
                        var element = CreateDiv("char", parent, node.text, len > 1 ? "Characters." : "Character.", len > 1 ? ("Matches the characters \"" + node.text + "\" literally.") : ("Matches the character \"" + node.text + "\" literally."));
                        PatternsShow(node.children, element, basediv);
                    }
                    break;
                case exports.PAT.SETCHARS:
                    {
                        var len = node.text.length;
                        var element = CreateDiv("char", parent, node.text, "Character.", (parent.classList.contains("inverse") ? "Doesn't match \"" : "Matches \"") + node.text + "\" literally.");
                        PatternsShow(node.children, element, basediv);
                    }
                    break;
                case exports.PAT.QUANTIFIER:
                    {
                        var q = parseInt(node.text, 10);
                        var element = CreateDiv("quantifier", parent, exports.PAT_QUANTIFIER_NAMES[q][0], "Quantifier (" + exports.PAT_QUANTIFIER_NAMES[q][1] + ").", exports.PAT_QUANTIFIER_NAMES[q][2]);
                        PatternsShow(node.children, element, basediv);
                    }
                    break;
                case exports.PAT.ANY:
                    {
                        var element = CreateDiv("any", parent, ".", "Any.", "Matches any character. Equivalent to \"[%s%S]\".");
                        PatternsShow(node.children, element, basediv);
                    }
                    break;
                case exports.PAT.ESCAPED:
                    {
                        var element = CreateDiv("char", parent, "%" + node.text, "Escaped character.", "Matches the character \"" + node.text + "\" literally.");
                        if (parent === basediv) {
                            PatternsShow(node.children, element, basediv);
                        }
                    }
                    break;
                case exports.PAT.CLASS:
                    {
                        var q = parseInt(node.text, 10);
                        var element = CreateDiv("class", parent, "%" + node.text, "Class (" + exports.PAT_CLASS_NAMES[q][0] + ").", "Matches " + exports.PAT_CLASS_NAMES[q][1] + ".");
                        if (parent === basediv) {
                            PatternsShow(node.children, element, basediv);
                        }
                    }
                    break;
                case exports.PAT.CAPTUREREF:
                    {
                        var element = CreateDiv("captureref", parent, "%" + node.text, "Capture reference.", "Matches or returns the same pattern as in referenced capture \"" + node.text + "\".");
                        PatternsShow(node.children, element, basediv);
                    }
                    break;
                case exports.PAT.BALANCED:
                    {
                        CreateDiv("balanced", parent, "%b" + node.text, "Balanced match.", "Matches characters starting at \"" + node.text.charAt(0) + "\" until the corresponding \"" + node.text.charAt(1) + "\".");
                    }
                    break;
                case exports.PAT.SET:
                    {
                        var element = CreateDiv("set", parent, "[...]", "Set.", "Matches any character from the set:");
                        PatternsShow(node.children, element, basediv);
                    }
                    break;
                case exports.PAT.INVERSESET:
                    {
                        var element = CreateDiv("inverse set", parent, "[^...]", "Inverse set.", "Matches any character except:");
                        PatternsShow(node.children, element, basediv);
                    }
                    break;
                case exports.PAT.POSITION:
                    {
                        var element = CreateDiv("position", parent, "()", "Position capture #" + node.text + ".", "Captures the position in the string.");
                        PatternsShow(node.children, element, basediv);
                    }
                    break;
                case exports.PAT.CAPTURE:
                    {
                        var element = CreateDiv("capture", parent, "(...)", "Capture #" + node.text + ".", "Makes a pattern group to be used for backreferencing or substring output.");
                        PatternsShow(node.children, element, basediv);
                    }
                    break;
                case exports.PAT.FRONTIER:
                    {
                        var element = CreateDiv("frontier", parent, "%f", "Frontier.", "Matches any character from the set when the previous character doesn't match it. Can match start and end boundaries of the string.");
                        PatternsShow(node.children, element, basediv);
                    }
                    break;
                case exports.PAT.RANGE:
                    {
                        var s = node.text.charAt(0), e = node.text.charAt(1);
                        var element = CreateDiv("range", parent, s + "-" + e, "Range.", "Matches any character in the range \"" + s + "\" (byte " + s.charCodeAt(0) + ") to \"" + e + "\" (byte " + e.charCodeAt(0) + ").");
                        if (s > e) {
                            CreateDiv("warning", element, "?", "Warning.", "The range won't match anything because the start of the range is greater than the end (\"" + s + "\" (" + s.charCodeAt(0) + ") > \"" + e + "\" (" + e.charCodeAt(0) + ")).");
                        }
                        else if (s === e) {
                            CreateDiv("note", element, "i", "Note.", "The range has range of one character. Consider using regular char instead.");
                        }
                    }
                    break;
                case exports.PAT.START:
                    {
                        var element = CreateDiv("start", parent, "^", "Start anchor.", "Tells to match the pattern only if it starts from the beginning of the string.");
                    }
                    break;
                case exports.PAT.END:
                    {
                        var element = CreateDiv("end", parent, "$", "End anchor.", "Tells to match the pattern only if it ends at the end of the string.");
                    }
                    break;
                case exports.PAT.WARNING:
                    {
                        CreateDiv("warning", parent, "?", "Warning.", node.text);
                    }
                    break;
                case exports.PAT.NOTE:
                    {
                        CreateDiv("note", parent, "i", "Note.", node.text);
                    }
                    break;
                case exports.PAT.ERROR:
                    {
                        CreateDiv("error", parent, "!", "Error.", node.text);
                    }
                    break;
                default:
                    console.log(node);
                    CreateDiv("error", basediv, "!", "Error.", "Unknown pattern object (" + node.type + ") [" + exports.PatToStr[node.type] + "]");
                    break;
            }
        }
    }
    catch (e) {
        CreateDiv("error", basediv, "!", "Error.", "Pattern renderer error: " + e.name + ": " + e.message);
    }
}
exports.PatternsShow = PatternsShow;
function PatternsPrint(input, basediv) {
    var tokens = PatternsLex(input);
    var output = PatternsParse(tokens);
    if (!basediv) {
        basediv = document.getElementById("result");
        if (basediv === null)
            return;
    }
    CleanBaseDiv(basediv);
    PatternsShow(output, basediv, basediv);
}
exports.PatternsPrint = PatternsPrint;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__[607](0, __webpack_exports__);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;