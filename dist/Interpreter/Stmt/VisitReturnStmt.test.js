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
describe('when given a return statement', () => {
    test('throws a return', async () => {
        const interpreter = new Interpreter_1.default(MockOutput_1.default, jest.fn(), MockEnvironment_1.default);
        const returnStmt = new AST_1.ReturnStmt(MockToken_1.default(Types_1.TokenType.IDENTIFIER, 'foo'), new AST_1.LiteralExpr('bar'));
        await expect(interpreter.visitReturnStmt(returnStmt))
            .rejects
            .toThrow(Types_1.DScriptFunction.Return);
    });
});
