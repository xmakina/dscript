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
describe('when given logical expressions', () => {
    let interpreter;
    const theories = [
        { input: { left: true, operator: Types_1.TokenType.AND, right: true }, expected: true },
        { input: { left: true, operator: Types_1.TokenType.AND, right: false }, expected: false },
        { input: { left: false, operator: Types_1.TokenType.AND, right: false }, expected: false },
        { input: { left: true, operator: Types_1.TokenType.OR, right: true }, expected: true },
        { input: { left: true, operator: Types_1.TokenType.OR, right: false }, expected: true },
        { input: { left: false, operator: Types_1.TokenType.OR, right: false }, expected: false }
    ];
    const name = ({ input, expected }) => `when given ${JSON.stringify(input.left)} ${Types_1.TokenType[input.operator]} ${JSON.stringify(input.right)}, it evaluates to ${expected.toString()}`;
    beforeEach(() => {
        interpreter = new Interpreter_1.default(MockOutput_1.default, jest.fn(), MockEnvironment_1.default);
    });
    jest_theories_1.default(name, theories, async (theory) => {
        const expr = new AST_1.LogicalExpr(new AST_1.LiteralExpr(theory.input.left), MockToken_1.default(theory.input.operator), new AST_1.LiteralExpr(theory.input.right));
        expect(await expr.accept(interpreter)).toEqual(theory.expected);
    });
});
