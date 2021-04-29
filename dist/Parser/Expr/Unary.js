"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AST_1 = require("../../AST");
const Types_1 = require("../../Types");
const Call_1 = __importDefault(require("./Call"));
function Unary(parser) {
    if (parser.match(Types_1.TokenType.BANG, Types_1.TokenType.MINUS)) {
        const operator = parser.previous();
        const right = Unary(parser);
        return new AST_1.UnaryExpr(operator, right);
    }
    return Call_1.default(parser);
}
exports.default = Unary;
