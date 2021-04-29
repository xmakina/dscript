"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AST_1 = require("../../AST");
const Types_1 = require("../../Types");
const Term_1 = __importDefault(require("./Term"));
exports.default = (parser) => {
    let expr = Term_1.default(parser);
    while (parser.match(Types_1.TokenType.GREATER, Types_1.TokenType.GREATER_EQUAL, Types_1.TokenType.LESS, Types_1.TokenType.LESS_EQUAL)) {
        const operator = parser.previous();
        const right = Term_1.default(parser);
        expr = new AST_1.BinaryExpr(expr, operator, right);
    }
    return expr;
};
