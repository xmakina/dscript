"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AST_1 = require("../../AST");
const Types_1 = require("../../Types");
const Expression_1 = __importDefault(require("../Expr/Expression"));
function Set(parser) {
    const name = parser.consume(Types_1.TokenType.IDENTIFIER, 'Expect variable name.');
    if (parser.match(Types_1.TokenType.LEFT_BRACE)) {
        return setArrayStatement(name);
    }
    parser.consume(Types_1.TokenType.EQUAL, 'Expect equal after variable name.');
    const value = Expression_1.default(parser);
    parser.consume(Types_1.TokenType.NEWLINE, 'Expect new line after variable declaration.');
    return new AST_1.SetStmt(name, value);
    function setArrayStatement(name) {
        const index = Expression_1.default(parser);
        parser.consume(Types_1.TokenType.RIGHT_BRACE, `Expect ']' to close out index list, got ${Types_1.TokenType[parser.peek().type]}.`);
        parser.consume(Types_1.TokenType.EQUAL, 'Expect equal after variable name.');
        const value = Expression_1.default(parser);
        return new AST_1.SetArrayStmt(name, index, value);
    }
}
exports.default = Set;
