"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AST_1 = require("../../AST");
const Types_1 = require("../../Types");
const Unary_1 = __importDefault(require("./Unary"));
exports.default = (parser) => {
    let expr = Unary_1.default(parser);
    while (parser.match(Types_1.TokenType.SLASH, Types_1.TokenType.STAR)) {
        const operator = parser.previous();
        const right = Unary_1.default(parser);
        expr = new AST_1.BinaryExpr(expr, operator, right);
    }
    return expr;
};
