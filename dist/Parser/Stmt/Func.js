"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AST_1 = require("../../AST");
const Types_1 = require("../../Types");
const Block_1 = __importDefault(require("./Block"));
function Func(parser) {
    const name = parser.consume(Types_1.TokenType.IDENTIFIER, 'Expect function name.');
    parser.consume(Types_1.TokenType.LEFT_PAREN, "Expect '(' after function name.");
    const parameters = [];
    if (!parser.check(Types_1.TokenType.RIGHT_PAREN)) {
        do {
            if (parameters.length >= 255) {
                throw new Types_1.ParseError(name, "Can't have more than 255 parameters.");
            }
            parameters.push(parser.consume(Types_1.TokenType.IDENTIFIER, 'Expect parameter name.'));
        } while (parser.match(Types_1.TokenType.COMMA));
    }
    parser.consume(Types_1.TokenType.RIGHT_PAREN, "Expect ')' after parameters.");
    parser.consume(Types_1.TokenType.NEWLINE, 'Expect newline after DEF.');
    const body = Block_1.default(parser)(Types_1.TokenType.DEND);
    return new AST_1.FunctionStmt(name, parameters, body.statements);
}
exports.default = Func;
