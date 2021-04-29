"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AST_1 = require("../../AST");
const Types_1 = require("../../Types");
exports.default = (parser) => {
    const name = parser.consume(Types_1.TokenType.IDENTIFIER, 'Expect variable name.');
    parser.consume(Types_1.TokenType.NEWLINE, 'Expect new line after variable declaration.');
    return new AST_1.DimStmt(name);
};
