"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AST_1 = require("../../AST");
const Types_1 = require("../../Types");
const Expression_1 = __importDefault(require("../Expr/Expression"));
function Append(parser) {
    const value = Expression_1.default(parser);
    parser.consume(Types_1.TokenType.NEWLINE, 'Expect new line after value.');
    return new AST_1.AppendStmt(value);
}
exports.default = Append;
