"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AST_1 = require("../../AST");
const Types_1 = require("../../Types");
const Append_1 = __importDefault(require("./Append"));
const Dim_1 = __importDefault(require("./Dim"));
const Expression_1 = __importDefault(require("../Expr/Expression"));
const Func_1 = __importDefault(require("./Func"));
const If_1 = __importDefault(require("./If"));
const Input_1 = __importDefault(require("./Input"));
const Let_1 = __importDefault(require("./Let"));
const Print_1 = __importDefault(require("./Print"));
const Replace_1 = __importDefault(require("./Replace"));
const Set_1 = __importDefault(require("./Set"));
const For_1 = __importDefault(require("./For"));
const While_1 = __importDefault(require("./While"));
const Return_1 = __importDefault(require("./Return"));
function Statement(parser) {
    if (parser.match(Types_1.TokenType.LET))
        return Let_1.default(parser);
    if (parser.match(Types_1.TokenType.DIM))
        return Dim_1.default(parser);
    if (parser.match(Types_1.TokenType.DEF))
        return Func_1.default(parser);
    if (parser.match(Types_1.TokenType.PRINT))
        return Print_1.default(parser);
    if (parser.match(Types_1.TokenType.SET))
        return Set_1.default(parser);
    if (parser.match(Types_1.TokenType.IF))
        return If_1.default(parser);
    if (parser.match(Types_1.TokenType.WHILE))
        return While_1.default(parser);
    if (parser.match(Types_1.TokenType.FOR))
        return For_1.default(parser);
    if (parser.match(Types_1.TokenType.APPEND))
        return Append_1.default(parser);
    if (parser.match(Types_1.TokenType.REPLACE))
        return Replace_1.default(parser);
    if (parser.match(Types_1.TokenType.INPUT))
        return Input_1.default(parser);
    if (parser.match(Types_1.TokenType.RETURN))
        return Return_1.default(parser);
    const expr = Expression_1.default(parser);
    parser.consume(Types_1.TokenType.NEWLINE, 'Expect newline after expression');
    return new AST_1.ExpressionStmt(expr);
}
exports.default = Statement;
