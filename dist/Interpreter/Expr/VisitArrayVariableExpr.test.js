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
describe('with an array variable expression', () => {
    let interpreter;
    const mockGet = jest.fn();
    beforeEach(() => {
        jest.clearAllMocks();
        MockEnvironment_1.default.get = mockGet;
        mockGet.mockImplementation((name) => name.lexeme === 'foo' ? [1, 2] : undefined);
        interpreter = new Interpreter_1.default(MockOutput_1.default, jest.fn(), MockEnvironment_1.default);
        interpreter.environment = MockEnvironment_1.default;
    });
    test('returns the array index value value', async () => {
        expect(await new AST_1.ArrayVariableExpr(MockToken_1.default(Types_1.TokenType.IDENTIFIER, 'foo'), new AST_1.LiteralExpr(0)).accept(interpreter)).toEqual(1);
        expect(await new AST_1.ArrayVariableExpr(MockToken_1.default(Types_1.TokenType.IDENTIFIER, 'foo'), new AST_1.LiteralExpr(1)).accept(interpreter)).toEqual(2);
    });
});
