"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AST_1 = require("../../AST");
const Types_1 = require("../../Types");
const MockToken_1 = __importDefault(require("../../Utils/MockToken"));
const Parser_1 = __importDefault(require("../Parser"));
const Print_1 = __importDefault(require("./Print"));
describe('when given print statement arguments', () => {
    const tokens = [MockToken_1.default(Types_1.TokenType.STRING, 'Hello world!'), MockToken_1.default(Types_1.TokenType.NEWLINE)];
    test('it returns a print statement', () => {
        const parser = new Parser_1.default(jest.fn(), tokens);
        const stmt = Print_1.default(parser);
        expect(stmt).toBeInstanceOf(AST_1.PrintStmt);
        const printStmt = stmt;
        expect(printStmt.expression).toBeInstanceOf(AST_1.LiteralExpr);
        expect(printStmt.expression.value).toEqual('Hello world!');
    });
});
