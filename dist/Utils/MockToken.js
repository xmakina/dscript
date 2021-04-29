"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("../Scanner/Token");
exports.default = (type, literal = null, lexeme) => {
    const lexemeUsed = lexeme !== undefined ? lexeme
        : typeof literal === 'string' ? literal
            : '';
    return new Token_1.Token(type, lexemeUsed, literal, 1);
};
