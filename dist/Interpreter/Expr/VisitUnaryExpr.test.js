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
describe('with simple expressions', () => {
    let interpreter;
    const theories = [
        { input: new AST_1.UnaryExpr(MockToken_1.default(Types_1.TokenType.MINUS), new AST_1.LiteralExpr(1)), expected: -1 },
        { input: new AST_1.UnaryExpr(MockToken_1.default(Types_1.TokenType.BANG), new AST_1.LiteralExpr(false)), expected: true }
    ];
    const name = ({ input, expected }) => `when given ${input.constructor.name}, it evaluates to ${expected.toString()}`;
    beforeEach(() => {
        interpreter = new Interpreter_1.default(MockOutput_1.default, jest.fn(), MockEnvironment_1.default);
    });
    jest_theories_1.default(name, theories, async (theory) => {
        expect(await theory.input.accept(interpreter)).toEqual(theory.expected);
    });
});
