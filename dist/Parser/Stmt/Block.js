"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AST_1 = require("../../AST");
const Types_1 = require("../../Types");
const Statement_1 = __importDefault(require("./Statement"));
exports.default = (parser) => (endToken, expectNewLine = true) => {
    const statements = [];
    while (!parser.check(endToken) && !parser.isAtEnd()) {
        if (parser.match(Types_1.TokenType.NEWLINE)) {
            // swallow the newline
        }
        else {
            statements.push(Statement_1.default(parser));
        }
    }
    parser.consume(endToken, `Expect '${Types_1.TokenType[endToken]}'.`);
    if (expectNewLine) {
        parser.consume(Types_1.TokenType.NEWLINE, `Expect new line after '${Types_1.TokenType[endToken]}'.`);
    }
    return new AST_1.BlockStmt(statements);
};
