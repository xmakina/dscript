"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AST_1 = require("../../AST");
const Types_1 = require("../../Types");
const Or_1 = __importDefault(require("./Or"));
function Assign(parser) {
    const expr = Or_1.default(parser);
    if (parser.match(Types_1.TokenType.EQUAL)) {
        const equals = parser.previous();
        const value = Assign(parser);
        if (expr instanceof AST_1.VariableExpr) {
            const name = expr.name;
            return new AST_1.AssignExpr(name, value);
        }
        throw new Types_1.ParseError(equals, 'Invalid assignment target.');
    }
    return expr;
}
exports.default = Assign;
