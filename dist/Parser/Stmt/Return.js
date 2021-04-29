"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AST_1 = require("../../AST");
const Types_1 = require("../../Types");
const Expression_1 = __importDefault(require("../Expr/Expression"));
exports.default = (parser) => {
    const keyword = parser.previous();
    let value = null;
    if (!parser.check(Types_1.TokenType.NEWLINE)) {
        value = Expression_1.default(parser);
    }
    parser.consume(Types_1.TokenType.NEWLINE, 'Expect newline after return value.');
    return new AST_1.ReturnStmt(keyword, value);
};
