"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jest_theories_1 = __importDefault(require("jest-theories"));
const AST_1 = require("../../AST");
const Types_1 = require("../../Types");
const MockEnvironment_1 = __importDefault(require("../../Utils/MockEnvironment"));
const MockOutput_1 = __importDefault(require("../../Utils/MockOutput"));
const MockToken_1 = __importDefault(require("../../Utils/MockToken"));
const Interpreter_1 = __importDefault(require("../Interpreter"));
describe('when given a BinaryExpr', () => {
    let interpreter;
    beforeEach(() => {
        interpreter = new Interpreter_1.default(MockOutput_1.default, jest.fn(), MockEnvironment_1.default);
    });
    describe('when given correct operands', () => {
        const theories = [
            { input: { left: 4, operator: Types_1.TokenType.MINUS, right: 1 }, expected: 3 },
            { input: { left: 4, operator: Types_1.TokenType.SLASH, right: 2 }, expected: 2 },
            { input: { left: 4, operator: Types_1.TokenType.STAR, right: 2 }, expected: 8 },
            { input: { left: 4, operator: Types_1.TokenType.PLUS, right: 2 }, expected: 6 },
            { input: { left: 'a', operator: Types_1.TokenType.PLUS, right: 'b' }, expected: 'ab' },
            { input: { left: 'one', operator: Types_1.TokenType.PLUS, right: 4 }, expected: 'one4' },
            { input: { left: 4, operator: Types_1.TokenType.PLUS, right: 'one' }, expected: '4one' },
            { input: { left: 1, operator: Types_1.TokenType.GREATER, right: 2 }, expected: false },
            { input: { left: 2, operator: Types_1.TokenType.GREATER, right: 1 }, expected: true },
            { input: { left: 2, operator: Types_1.TokenType.GREATER_EQUAL, right: 2 }, expected: true },
            { input: { left: 1, operator: Types_1.TokenType.LESS, right: 2 }, expected: true },
            { input: { left: 2, operator: Types_1.TokenType.LESS, right: 1 }, expected: false },
            { input: { left: 2, operator: Types_1.TokenType.LESS_EQUAL, right: 2 }, expected: true },
            { input: { left: 2, operator: Types_1.TokenType.UNEQUAL, right: 2 }, expected: false },
            { input: { left: 1, operator: Types_1.TokenType.UNEQUAL, right: 2 }, expected: true },
            { input: { left: 2, operator: Types_1.TokenType.EQUAL, right: 2 }, expected: true },
            { input: { left: 1, operator: Types_1.TokenType.EQUAL, right: 2 }, expected: false }
        ];
        const name = ({ input, expected }) => `when given ${JSON.stringify(input.left)} ${Types_1.TokenType[input.operator]} ${JSON.stringify(input.right)}, it evaluates to ${expected.toString()}`;
        jest_theories_1.default(name, theories, async (theory) => {
            const expr = new AST_1.BinaryExpr(new AST_1.LiteralExpr(theory.input.left), MockToken_1.default(theory.input.operator), new AST_1.LiteralExpr(theory.input.right));
            expect(await expr.accept(interpreter)).toEqual(theory.expected);
        });
    });
    describe('when given wrong operands', () => {
        const theories = [
            { input: { left: 'one', operator: Types_1.TokenType.MINUS, right: 1 } },
            { input: { left: 'one', operator: Types_1.TokenType.SLASH, right: 1 } },
            { input: { left: 'one', operator: Types_1.TokenType.STAR, right: 1 } },
            { input: { left: 'one', operator: Types_1.TokenType.GREATER_EQUAL, right: 1 } },
            { input: { left: 'one', operator: Types_1.TokenType.GREATER, right: 1 } },
            { input: { left: 'one', operator: Types_1.TokenType.LESS_EQUAL, right: 1 } },
            { input: { left: 'one', operator: Types_1.TokenType.LESS, right: 1 } },
            { input: { left: 1, operator: Types_1.TokenType.SLASH, right: 0 } }
        ];
        jest_theories_1.default('bad operands throw runtime errors', theories, async (theory) => {
            const expr = new AST_1.BinaryExpr(new AST_1.LiteralExpr(theory.input.left), MockToken_1.default(theory.input.operator), new AST_1.LiteralExpr(theory.input.right));
            await expect(expr.accept(interpreter)).rejects.toThrow(Types_1.RuntimeError);
        });
    });
});
