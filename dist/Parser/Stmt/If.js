"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AST_1 = require("../../AST");
const Types_1 = require("../../Types");
const Expression_1 = __importDefault(require("../Expr/Expression"));
const Statement_1 = __importDefault(require("./Statement"));
function If(parser) {
    const condition = Expression_1.default(parser);
    parser.consume(Types_1.TokenType.THEN, "Expect 'THEN' after IF condition.");
    const thenBranch = Statement_1.default(parser);
    let elseBranch;
    if (parser.match(Types_1.TokenType.ELSE)) {
        elseBranch = Statement_1.default(parser);
    }
    return new AST_1.IfStmt(condition, thenBranch, elseBranch);
}
exports.default = If;
