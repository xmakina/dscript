"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AST_1 = require("../../AST");
const Types_1 = require("../../Types");
const Block_1 = __importDefault(require("./Block"));
const Expression_1 = __importDefault(require("../Expr/Expression"));
function While(parser) {
    const condition = Expression_1.default(parser);
    parser.consume(Types_1.TokenType.NEWLINE, 'Expect new line after WHILE condition.');
    const body = Block_1.default(parser)(Types_1.TokenType.WEND);
    return new AST_1.WhileStmt(condition, body);
}
exports.default = While;
