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
describe('when given an if statement', () => {
    const fooToken = MockToken_1.default(Types_1.TokenType.IDENTIFIER, 'foo');
    test('when the statement is true', async () => {
        const interpreter = new Interpreter_1.default(MockOutput_1.default, jest.fn(), MockEnvironment_1.default);
        await interpreter.visitLetStmt(new AST_1.LetStmt(fooToken, new AST_1.LiteralExpr('bar')));
        await interpreter.visitIfStmt(new AST_1.IfStmt(new AST_1.BinaryExpr(new AST_1.LiteralExpr('foo'), MockToken_1.default(Types_1.TokenType.EQUAL), new AST_1.LiteralExpr('foo')), new AST_1.PrintStmt(new AST_1.LiteralExpr('is equal')), new AST_1.PrintStmt(new AST_1.LiteralExpr('not equal'))));
        expect(MockOutput_1.default.print).toBeCalledWith('is equal');
    });
    test('when the statement is false', async () => {
        const interpreter = new Interpreter_1.default(MockOutput_1.default, jest.fn(), MockEnvironment_1.default);
        await interpreter.visitLetStmt(new AST_1.LetStmt(fooToken, new AST_1.LiteralExpr('flim')));
        await interpreter.visitIfStmt(new AST_1.IfStmt(new AST_1.BinaryExpr(new AST_1.LiteralExpr('foo'), MockToken_1.default(Types_1.TokenType.EQUAL), new AST_1.LiteralExpr('bar')), new AST_1.PrintStmt(new AST_1.LiteralExpr('is equal')), new AST_1.PrintStmt(new AST_1.LiteralExpr('not equal'))));
        expect(MockOutput_1.default.print).toBeCalledWith('not equal');
    });
});
