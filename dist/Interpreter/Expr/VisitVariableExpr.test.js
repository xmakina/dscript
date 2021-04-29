"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AST_1 = require("../../AST");
const Types_1 = require("../../Types");
const MockEnvironment_1 = __importDefault(require("../../Utils/MockEnvironment"));
const MockOutput_1 = __importDefault(require("../../Utils/MockOutput"));
const MockToken_1 = __importDefault(require("../../Utils/MockToken"));
const Interpreter_1 = __importDefault(require("../Interpreter"));
describe('with variable expression', () => {
    let interpreter;
    beforeEach(() => {
        jest.clearAllMocks();
        MockEnvironment_1.default.get = jest.fn().mockImplementation((name) => name.lexeme === 'foo' ? 'bar' : undefined);
        interpreter = new Interpreter_1.default(MockOutput_1.default, jest.fn(), MockEnvironment_1.default);
        interpreter.environment = MockEnvironment_1.default;
    });
    describe('with a set variable', () => {
        test('returns the variable value', async () => {
            expect(await new AST_1.VariableExpr(MockToken_1.default(Types_1.TokenType.IDENTIFIER, 'foo')).accept(interpreter)).toEqual('bar');
        });
    });
});
