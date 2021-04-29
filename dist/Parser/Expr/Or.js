"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AST_1 = require("../../AST");
const Types_1 = require("../../Types");
const And_1 = __importDefault(require("./And"));
exports.default = (parser) => {
    let expr = And_1.default(parser);
    while (parser.match(Types_1.TokenType.OR)) {
        const operator = parser.previous();
        const right = And_1.default(parser);
        expr = new AST_1.LogicalExpr(expr, operator, right);
    }
    return expr;
};
