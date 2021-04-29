"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AST_1 = require("../../AST");
const MockOutput_1 = __importDefault(require("../../Utils/MockOutput"));
const Transpiler_1 = require("../Transpiler");
describe('with the append statement', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('returns the literal value', () => {
        const expr = new AST_1.LiteralExpr('Hello!');
        const result = new Transpiler_1.Transpiler(MockOutput_1.default, jest.fn()).transpile(expr);
        expect(result).toEqual('"Hello!"');
    });
});
