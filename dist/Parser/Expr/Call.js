"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AST_1 = require("../../AST");
const Types_1 = require("../../Types");
const Expression_1 = __importDefault(require("./Expression"));
const Primary_1 = __importDefault(require("./Primary"));
exports.default = (parser) => {
    let expr = Primary_1.default(parser);
    for (;;) {
        if (parser.match(Types_1.TokenType.LEFT_PAREN)) {
            expr = finishCall(expr);
        }
        else {
            break;
        }
    }
    return expr;
    function finishCall(callee) {
        const args = [];
        if (!parser.check(Types_1.TokenType.RIGHT_PAREN)) {
            do {
                if (args.length >= 255) {
                    throw new Types_1.ParseError(parser.peek(), "Can't have more than 255 arguments.");
                }
                args.push(Expression_1.default(parser));
            } while (parser.match(Types_1.TokenType.COMMA));
        }
        const paren = parser.consume(Types_1.TokenType.RIGHT_PAREN, "Expect ')' after arguments.");
        return new AST_1.CallExpr(callee, paren, args);
    }
};
