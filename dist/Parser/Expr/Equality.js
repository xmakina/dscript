"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AST_1 = require("../../AST");
const Types_1 = require("../../Types");
const Comparison_1 = __importDefault(require("./Comparison"));
exports.default = (parser) => {
    let expr = Comparison_1.default(parser);
    while (parser.match(Types_1.TokenType.UNEQUAL, Types_1.TokenType.EQUAL)) {
        const operator = parser.previous();
        const right = Comparison_1.default(parser);
        expr = new AST_1.BinaryExpr(expr, operator, right);
    }
    return expr;
};
