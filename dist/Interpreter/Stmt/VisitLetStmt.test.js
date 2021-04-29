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
describe('when given a let statement', () => {
    const fooToken = MockToken_1.default(Types_1.TokenType.IDENTIFIER, 'foo');
    test('should define foo as bar', async () => {
        const interpreter = new Interpreter_1.default(MockOutput_1.default, jest.fn(), MockEnvironment_1.default);
        await interpreter.visitLetStmt(new AST_1.LetStmt(fooToken, new AST_1.LiteralExpr('bar')));
        expect(MockEnvironment_1.default.define).toBeCalledWith('foo', 'bar');
    });
});
