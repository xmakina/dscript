"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require(".."));
const AST_1 = require("../../AST");
const Token_1 = require("../../Scanner/Token");
const Types_1 = require("../../Types");
const MockToken_1 = __importDefault(require("../../Utils/MockToken"));
const Primary_1 = __importDefault(require("./Primary"));
describe('with the Primary parser', () => {
    const report = jest.fn();
    describe('when given a literal', () => {
        const tokens = [
            new Token_1.Token(Types_1.TokenType.NUMBER, '', 1, 1),
            new Token_1.Token(Types_1.TokenType.EOF, '', null, 1)
        ];
        beforeEach(() => jest.clearAllMocks());
        test('returns a literal', () => {
            const parser = new __1.default(report, tokens);
            const expr = Primary_1.default(parser);
            expect(expr.value).toEqual(1);
        });
    });
    describe('when given a variable', () => {
        const tokens = [
            new Token_1.Token(Types_1.TokenType.IDENTIFIER, 'foo', 1, 1),
            new Token_1.Token(Types_1.TokenType.EOF, '', null, 1)
        ];
        beforeEach(() => jest.clearAllMocks());
        test('returns a variable', () => {
            const parser = new __1.default(report, tokens);
            const expr = Primary_1.default(parser);
            expect(expr.name.lexeme).toEqual('foo');
        });
    });
    describe('when given an array variable', () => {
        const tokens = [
            MockToken_1.default(Types_1.TokenType.IDENTIFIER, 'foo'),
            MockToken_1.default(Types_1.TokenType.LEFT_BRACE),
            MockToken_1.default(Types_1.TokenType.NUMBER, 1),
            MockToken_1.default(Types_1.TokenType.RIGHT_BRACE),
            MockToken_1.default(Types_1.TokenType.NEWLINE), new Token_1.Token(Types_1.TokenType.EOF, '', null, 1)
        ];
        beforeEach(() => jest.clearAllMocks());
        test('returns an array accessing variable', () => {
            const parser = new __1.default(report, tokens);
            const expr = Primary_1.default(parser);
            expect(expr).toBeInstanceOf(AST_1.ArrayVariableExpr);
            const arrExpr = expr;
            expect(arrExpr.name.lexeme).toEqual('foo');
            expect(arrExpr.index).toBeInstanceOf(AST_1.LiteralExpr);
            const indexExpr = arrExpr.index;
            expect(indexExpr.value).toEqual(1);
        });
    });
});
