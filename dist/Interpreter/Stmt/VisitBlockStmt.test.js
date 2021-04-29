"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AST_1 = require("../../AST");
const MockEnvironment_1 = __importDefault(require("../../Utils/MockEnvironment"));
const MockOutput_1 = __importDefault(require("../../Utils/MockOutput"));
const Interpreter_1 = __importDefault(require("../Interpreter"));
describe('when given a block statement', () => {
    test('it processes the block', () => {
        const interpreter = new Interpreter_1.default(MockOutput_1.default, jest.fn(), MockEnvironment_1.default);
        expect(async () => await interpreter.visitBlockStmt(new AST_1.BlockStmt([]))).not.toThrow();
    });
});
