"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AST_1 = require("../../AST");
const Token_1 = require("../../Scanner/Token");
const Types_1 = require("../../Types");
const Expression_1 = __importDefault(require("../Expr/Expression"));
const Block_1 = __importDefault(require("./Block"));
function For(parser) {
    const name = parser.consume(Types_1.TokenType.IDENTIFIER, 'Expect variable name.');
    parser.consume(Types_1.TokenType.EQUAL, 'Expect equal after variable name.');
    const value = Expression_1.default(parser);
    const initializer = new AST_1.LetStmt(name, value);
    parser.consume(Types_1.TokenType.TO, 'Expect TO after variable setup.');
    const maxValue = Expression_1.default(parser);
    const condition = new AST_1.BinaryExpr(new AST_1.VariableExpr(name), new Token_1.Token(Types_1.TokenType.UNEQUAL, '<>', '<>', name.line), maxValue);
    let incrementValue = new AST_1.LiteralExpr(1);
    if (parser.match(Types_1.TokenType.STEP)) {
        incrementValue = Expression_1.default(parser);
    }
    const incrementExpr = new AST_1.BinaryExpr(new AST_1.VariableExpr(name), new Token_1.Token(Types_1.TokenType.PLUS, '+', '+', name.line), incrementValue);
    const increment = new AST_1.SetStmt(name, incrementExpr);
    parser.consume(Types_1.TokenType.NEWLINE, 'Expect new line after FOR statement.');
    let body = Block_1.default(parser)(Types_1.TokenType.NEXT, false);
    body = new AST_1.BlockStmt([body, increment]); // Append the increment
    body = new AST_1.WhileStmt(condition, body); // Setup the while statement
    body = new AST_1.BlockStmt([initializer, body]); // Prepend the initializer
    if (parser.check(Types_1.TokenType.IDENTIFIER)) {
        const target = parser.consume(Types_1.TokenType.IDENTIFIER, '');
        if (target.lexeme !== name.lexeme) {
            throw new Types_1.ParseError(target, `Expect NEXT to refer to variable ${name.lexeme}`);
        }
    }
    parser.consume(Types_1.TokenType.NEWLINE, 'Expect new line after NEXT.');
    return body;
}
exports.default = For;
