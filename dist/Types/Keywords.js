"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keywords = void 0;
const TokenType_1 = require("./TokenType");
exports.keywords = {
    true: TokenType_1.TokenType.TRUE,
    false: TokenType_1.TokenType.FALSE,
    null: TokenType_1.TokenType.NULL,
    print: TokenType_1.TokenType.PRINT,
    dim: TokenType_1.TokenType.DIM,
    let: TokenType_1.TokenType.LET,
    set: TokenType_1.TokenType.SET,
    if: TokenType_1.TokenType.IF,
    then: TokenType_1.TokenType.THEN,
    else: TokenType_1.TokenType.ELSE,
    and: TokenType_1.TokenType.AND,
    or: TokenType_1.TokenType.OR,
    while: TokenType_1.TokenType.WHILE,
    wend: TokenType_1.TokenType.WEND,
    for: TokenType_1.TokenType.FOR,
    to: TokenType_1.TokenType.TO,
    step: TokenType_1.TokenType.STEP,
    next: TokenType_1.TokenType.NEXT,
    append: TokenType_1.TokenType.APPEND,
    replace: TokenType_1.TokenType.REPLACE,
    input: TokenType_1.TokenType.INPUT,
    def: TokenType_1.TokenType.DEF,
    dend: TokenType_1.TokenType.DEND,
    return: TokenType_1.TokenType.RETURN
};
