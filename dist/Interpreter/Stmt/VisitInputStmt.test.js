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
describe('with input statement', () => {
    const fooToken = MockToken_1.default(Types_1.TokenType.IDENTIFIER, 'foo');
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('when user input will be flim', () => {
        let expectedPrompt;
        let interpreter;
        beforeEach(() => {
            MockOutput_1.default.prompt = async (prompt) => {
                expectedPrompt = prompt;
                const promise = new Promise((resolve) => {
                    setTimeout(() => resolve('flim'), 1000);
                });
                return promise;
            };
            interpreter = new Interpreter_1.default(MockOutput_1.default, jest.fn(), MockEnvironment_1.default);
        });
        test('should prompt with bar and then set foo to "flim"', async () => {
            await interpreter.visitInputStmt(new AST_1.InputStmt(fooToken, new AST_1.LiteralExpr('bar')));
            expect(expectedPrompt).toEqual('bar');
            expect(MockEnvironment_1.default.define).toHaveBeenLastCalledWith('foo', 'flim');
        });
    });
    describe('when user input will be 99.99', () => {
        let interpreter;
        beforeEach(() => {
            MockOutput_1.default.prompt = async () => {
                const promise = new Promise((resolve) => {
                    setTimeout(() => resolve('99.99'), 1000);
                });
                return promise;
            };
            interpreter = new Interpreter_1.default(MockOutput_1.default, jest.fn(), MockEnvironment_1.default);
        });
        test('should set foo to 99.99', async () => {
            await interpreter.visitInputStmt(new AST_1.InputStmt(fooToken, new AST_1.LiteralExpr('bar')));
            expect(MockEnvironment_1.default.define).toHaveBeenLastCalledWith('foo', 99.99);
        });
    });
    describe('when user input will be 1', () => {
        let interpreter;
        beforeEach(() => {
            MockOutput_1.default.prompt = async () => {
                const promise = new Promise((resolve) => {
                    setTimeout(() => resolve('1'), 1000);
                });
                return promise;
            };
            interpreter = new Interpreter_1.default(MockOutput_1.default, jest.fn(), MockEnvironment_1.default);
        });
        test('should set foo to 1', async () => {
            await interpreter.visitInputStmt(new AST_1.InputStmt(fooToken, new AST_1.LiteralExpr('bar')));
            expect(MockEnvironment_1.default.define).toHaveBeenLastCalledWith('foo', 1);
        });
    });
    describe('when user input will be -1', () => {
        let interpreter;
        beforeEach(() => {
            MockOutput_1.default.prompt = async () => {
                const promise = new Promise((resolve) => {
                    setTimeout(() => resolve('-1'), 1000);
                });
                return promise;
            };
            interpreter = new Interpreter_1.default(MockOutput_1.default, jest.fn(), MockEnvironment_1.default);
        });
        test('should set foo to -1', async () => {
            await interpreter.visitInputStmt(new AST_1.InputStmt(fooToken, new AST_1.LiteralExpr('bar')));
            expect(MockEnvironment_1.default.define).toHaveBeenLastCalledWith('foo', -1);
        });
    });
});
