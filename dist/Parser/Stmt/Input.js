"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AST_1 = require("../../AST");
const Types_1 = require("../../Types");
const Expression_1 = __importDefault(require("../Expr/Expression"));
exports.default = (parser) => {
    const name = parser.consume(Types_1.TokenType.IDENTIFIER, 'Expect variable name');
    let prompt;
    if (parser.check(Types_1.TokenType.STRING)) {
        prompt = Expression_1.default(parser);
    }
    else {
        prompt = new AST_1.LiteralExpr('');
    }
    return new AST_1.InputStmt(name, prompt);
};
