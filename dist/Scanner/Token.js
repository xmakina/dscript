"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const Utils_1 = require("../Interpreter/Utils");
class Token {
    constructor(type, lexeme, literal, line) {
        this.toString = () => `${this.type} ${this.lexeme} ${Utils_1.Stringify(this.literal)}`;
        this.type = type;
        this.lexeme = lexeme;
        this.literal = literal;
        this.line = line;
    }
}
exports.Token = Token;
