"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AST_1 = require("../../AST");
const MockEnvironment_1 = __importDefault(require("../../Utils/MockEnvironment"));
const MockOutput_1 = __importDefault(require("../../Utils/MockOutput"));
const Interpreter_1 = __importDefault(require("../Interpreter"));
describe('when given an append statement', () => {
    test('output told to append hello world', async () => {
        const interpreter = new Interpreter_1.default(MockOutput_1.default, jest.fn(), MockEnvironment_1.default);
        await interpreter.visitAppendStmt(new AST_1.AppendStmt(new AST_1.LiteralExpr('Hello world!')));
        expect(MockOutput_1.default.append).toBeCalledWith('Hello world!');
    });
});
