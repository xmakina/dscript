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
describe('when given a while loop', () => {
    const fooToken = MockToken_1.default(Types_1.TokenType.IDENTIFIER, 'foo');
    const fooVariable = new AST_1.VariableExpr(fooToken);
    beforeEach(() => {
        jest.clearAllMocks();
        MockEnvironment_1.default.get = jest.fn()
            .mockReturnValueOnce(1)
            .mockReturnValueOnce(2)
            .mockReturnValueOnce(3);
    });
    test('should run three times', async () => {
        const interpreter = new Interpreter_1.default(MockOutput_1.default, jest.fn(), MockEnvironment_1.default);
        await interpreter.visitLetStmt(new AST_1.LetStmt(fooToken, new AST_1.LiteralExpr(0)));
        await interpreter.visitWhileStmt(new AST_1.WhileStmt(new AST_1.BinaryExpr(fooVariable, MockToken_1.default(Types_1.TokenType.LESS), new AST_1.LiteralExpr(3)), new AST_1.ExpressionStmt(new AST_1.LiteralExpr(1))));
    });
});
