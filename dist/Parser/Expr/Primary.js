"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AST_1 = require("../../AST");
const Types_1 = require("../../Types");
const Expression_1 = __importDefault(require("./Expression"));
exports.default = (parser) => {
    if (parser.match(Types_1.TokenType.FALSE))
        return new AST_1.LiteralExpr(false);
    if (parser.match(Types_1.TokenType.TRUE))
        return new AST_1.LiteralExpr(true);
    if (parser.match(Types_1.TokenType.NULL))
        return new AST_1.LiteralExpr(null);
    if (parser.match(Types_1.TokenType.IDENTIFIER)) {
        const name = parser.previous();
        if (parser.match(Types_1.TokenType.LEFT_BRACE)) {
            const index = Expression_1.default(parser);
            parser.consume(Types_1.TokenType.RIGHT_BRACE, "Expect ']' after index.");
            return new AST_1.ArrayVariableExpr(name, index);
        }
        return new AST_1.VariableExpr(name);
    }
    if (parser.match(Types_1.TokenType.NUMBER, Types_1.TokenType.STRING)) {
        return new AST_1.LiteralExpr(parser.previous().literal);
    }
    if (parser.match(Types_1.TokenType.LEFT_PAREN)) {
        const expr = Expression_1.default(parser);
        parser.consume(Types_1.TokenType.RIGHT_PAREN, "Expect ')' after expression.");
        return new AST_1.GroupingExpr(expr);
    }
    throw new Types_1.ParseError(parser.peek(), `Expected expression, got ${Types_1.TokenType[parser.peek().type]}.`);
};
