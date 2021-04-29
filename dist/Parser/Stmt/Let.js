"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AST_1 = require("../../AST");
const Types_1 = require("../../Types");
const Assign_1 = __importDefault(require("../Expr/Assign"));
exports.default = (parser) => {
    const name = parser.consume(Types_1.TokenType.IDENTIFIER, 'Expect variable name.');
    parser.consume(Types_1.TokenType.EQUAL, 'Expect equal after variable name.');
    const initializer = Assign_1.default(parser);
    parser.consume(Types_1.TokenType.NEWLINE, 'Expect new line after variable declaration.');
    return new AST_1.LetStmt(name, initializer);
};
