"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AST_1 = require("../../AST");
const Types_1 = require("../../Types");
const MockOutput_1 = __importDefault(require("../../Utils/MockOutput"));
const MockToken_1 = __importDefault(require("../../Utils/MockToken"));
const Transpiler_1 = require("../Transpiler");
describe('with array assignment expression', () => {
    const expr = new AST_1.ArrayAssignExpr(MockToken_1.default(Types_1.TokenType.IDENTIFIER, 'foo'), new AST_1.LiteralExpr(1), new AST_1.LiteralExpr('bar'));
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('creates the correct array assignment', () => {
        const result = new Transpiler_1.Transpiler(MockOutput_1.default, jest.fn()).transpile(expr);
        expect(result).toEqual('foo[1] = "bar"');
    });
});
