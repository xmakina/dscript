"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
const Expr_1 = require("../AST/Expr");
const Stmt_1 = require("../AST/Stmt");
const Types_1 = require("../Types");
const MockToken_1 = __importDefault(require("../Utils/MockToken"));
const Statement_1 = __importDefault(require("./Stmt/Statement"));
describe('with statement parser', () => {
    describe('when given a print statement', () => {
        const tokens = [MockToken_1.default(Types_1.TokenType.PRINT), MockToken_1.default(Types_1.TokenType.STRING, 'Hello world!'), MockToken_1.default(Types_1.TokenType.NEWLINE), MockToken_1.default(Types_1.TokenType.EOF)];
        test('it returns a print statement', () => {
            const parser = new _1.default(jest.fn(), tokens);
            const stmt = Statement_1.default(parser);
            expect(stmt).toBeInstanceOf(Stmt_1.PrintStmt);
            expect(stmt.expression).toBeInstanceOf(Expr_1.LiteralExpr);
            expect(stmt.expression.value).toEqual('Hello world!');
        });
    });
    describe('when given a concatenation PRINT statement', () => {
        const tokens = [MockToken_1.default(Types_1.TokenType.PRINT),
            MockToken_1.default(Types_1.TokenType.IDENTIFIER, 'foo'), MockToken_1.default(Types_1.TokenType.PLUS), MockToken_1.default(Types_1.TokenType.STRING, ' bar'),
            MockToken_1.default(Types_1.TokenType.NEWLINE), MockToken_1.default(Types_1.TokenType.EOF)];
        test('it returns a print statement', () => {
            const parser = new _1.default(jest.fn(), tokens);
            const stmt = Statement_1.default(parser);
            expect(stmt).toBeInstanceOf(Stmt_1.PrintStmt);
            const printStmt = stmt;
            expect(printStmt.expression).toBeInstanceOf(Expr_1.BinaryExpr);
            const printStmtExpression = printStmt.expression;
            expect(printStmtExpression.left).toBeInstanceOf(Expr_1.VariableExpr);
            expect(printStmtExpression.right).toBeInstanceOf(Expr_1.LiteralExpr);
        });
    });
    describe('when given an append statement', () => {
        const tokens = [MockToken_1.default(Types_1.TokenType.APPEND), MockToken_1.default(Types_1.TokenType.STRING, 'foo'), MockToken_1.default(Types_1.TokenType.NEWLINE), MockToken_1.default(Types_1.TokenType.EOF)];
        test('it returns a print statement', () => {
            const parser = new _1.default(jest.fn(), tokens);
            const stmt = Statement_1.default(parser);
            expect(stmt).toBeInstanceOf(Stmt_1.AppendStmt);
            const appendStmt = stmt;
            expect(appendStmt.expression).toBeInstanceOf(Expr_1.LiteralExpr);
            expect(appendStmt.expression.value).toEqual('foo');
        });
    });
    describe('when given an reaplce statement', () => {
        const tokens = [MockToken_1.default(Types_1.TokenType.REPLACE), MockToken_1.default(Types_1.TokenType.STRING, 'foo'), MockToken_1.default(Types_1.TokenType.NEWLINE), MockToken_1.default(Types_1.TokenType.EOF)];
        test('it returns a print statement', () => {
            const parser = new _1.default(jest.fn(), tokens);
            const stmt = Statement_1.default(parser);
            expect(stmt).toBeInstanceOf(Stmt_1.ReplaceStmt);
            const replaceStmt = stmt;
            expect(replaceStmt.expression).toBeInstanceOf(Expr_1.LiteralExpr);
            expect(replaceStmt.expression.value).toEqual('foo');
        });
    });
    describe('when given a let statement', () => {
        const tokens = [MockToken_1.default(Types_1.TokenType.LET), MockToken_1.default(Types_1.TokenType.IDENTIFIER, 'foo'),
            MockToken_1.default(Types_1.TokenType.EQUAL),
            MockToken_1.default(Types_1.TokenType.STRING, 'bar'),
            MockToken_1.default(Types_1.TokenType.NEWLINE), MockToken_1.default(Types_1.TokenType.EOF)];
        test('it returns a let statement', () => {
            const parser = new _1.default(jest.fn(), tokens);
            const stmt = Statement_1.default(parser);
            expect(stmt).toBeInstanceOf(Stmt_1.LetStmt);
            expect(stmt.name.literal).toEqual('foo');
            expect(stmt.initializer).toBeInstanceOf(Expr_1.LiteralExpr);
            expect(stmt.initializer.value).toEqual('bar');
        });
    });
    describe('when given an IF statement', () => {
        const tokens = [
            MockToken_1.default(Types_1.TokenType.IF),
            MockToken_1.default(Types_1.TokenType.IDENTIFIER, 'foo'), MockToken_1.default(Types_1.TokenType.EQUAL), MockToken_1.default(Types_1.TokenType.IDENTIFIER, 'bar'),
            MockToken_1.default(Types_1.TokenType.THEN),
            MockToken_1.default(Types_1.TokenType.SET), MockToken_1.default(Types_1.TokenType.IDENTIFIER, '', 'flim'), MockToken_1.default(Types_1.TokenType.EQUAL), MockToken_1.default(Types_1.TokenType.STRING, 'flam'),
            MockToken_1.default(Types_1.TokenType.NEWLINE), MockToken_1.default(Types_1.TokenType.EOF)
        ];
        test('it returns an IF statement', () => {
            const parser = new _1.default(jest.fn(), tokens);
            const stmt = Statement_1.default(parser);
            expect(stmt).toBeInstanceOf(Stmt_1.IfStmt);
            expect(stmt.condition).toBeInstanceOf(Expr_1.BinaryExpr);
            expect(stmt.thenBranch).toBeInstanceOf(Stmt_1.SetStmt);
            expect(stmt.thenBranch.name.lexeme).toEqual('flim');
            expect(stmt.thenBranch.value).toBeInstanceOf(Expr_1.LiteralExpr);
            expect(stmt.thenBranch.value.value).toEqual('flam');
        });
    });
    describe('when given a while statement', () => {
        const tokens = [
            MockToken_1.default(Types_1.TokenType.WHILE), MockToken_1.default(Types_1.TokenType.IDENTIFIER, 'foo'), MockToken_1.default(Types_1.TokenType.EQUAL), MockToken_1.default(Types_1.TokenType.FALSE), MockToken_1.default(Types_1.TokenType.NEWLINE),
            MockToken_1.default(Types_1.TokenType.PRINT), MockToken_1.default(Types_1.TokenType.STRING, 'bar'), MockToken_1.default(Types_1.TokenType.NEWLINE),
            MockToken_1.default(Types_1.TokenType.WEND),
            MockToken_1.default(Types_1.TokenType.NEWLINE), MockToken_1.default(Types_1.TokenType.EOF)
        ];
        test('it returns a WHILE statement', () => {
            const parser = new _1.default(jest.fn(), tokens);
            const stmt = Statement_1.default(parser);
            expect(stmt).toBeInstanceOf(Stmt_1.WhileStmt);
            expect(stmt.condition).toBeInstanceOf(Expr_1.BinaryExpr);
            expect(stmt.body).toBeInstanceOf(Stmt_1.BlockStmt);
            expect(stmt.body.statements.length).toEqual(1);
            expect(stmt.body.statements[0]).toBeInstanceOf(Stmt_1.PrintStmt);
        });
    });
    describe('when given a for statement', () => {
        const tokens = [
            MockToken_1.default(Types_1.TokenType.FOR), MockToken_1.default(Types_1.TokenType.IDENTIFIER, 'foo'), MockToken_1.default(Types_1.TokenType.EQUAL), MockToken_1.default(Types_1.TokenType.NUMBER, 0),
            MockToken_1.default(Types_1.TokenType.TO), MockToken_1.default(Types_1.TokenType.NUMBER, 4),
            MockToken_1.default(Types_1.TokenType.STEP), MockToken_1.default(Types_1.TokenType.NUMBER, 2),
            MockToken_1.default(Types_1.TokenType.NEWLINE),
            MockToken_1.default(Types_1.TokenType.PRINT), MockToken_1.default(Types_1.TokenType.STRING, 'bar'), MockToken_1.default(Types_1.TokenType.NEWLINE),
            MockToken_1.default(Types_1.TokenType.NEXT), MockToken_1.default(Types_1.TokenType.IDENTIFIER, 'foo'),
            MockToken_1.default(Types_1.TokenType.NEWLINE), MockToken_1.default(Types_1.TokenType.EOF)
        ];
        test('it returns a FOR statement', () => {
            const parser = new _1.default(jest.fn(), tokens);
            const stmt = Statement_1.default(parser);
            expect(stmt).toBeInstanceOf(Stmt_1.BlockStmt);
            const firstBlock = stmt;
            expect(firstBlock.statements[0]).toBeInstanceOf(Stmt_1.LetStmt);
            const initializer = firstBlock.statements[0];
            expect(initializer.name.lexeme).toEqual('foo');
        });
    });
    describe('when given a dim statement', () => {
        const tokens = [
            MockToken_1.default(Types_1.TokenType.DIM), MockToken_1.default(Types_1.TokenType.IDENTIFIER, 'foo'),
            MockToken_1.default(Types_1.TokenType.NEWLINE), MockToken_1.default(Types_1.TokenType.EOF)
        ];
        test('it returns a DIM statement', () => {
            const parser = new _1.default(jest.fn(), tokens);
            const stmt = Statement_1.default(parser);
            expect(stmt).toBeInstanceOf(Stmt_1.DimStmt);
            const dimStmt = stmt;
            expect(dimStmt.name.lexeme).toEqual('foo');
        });
    });
    describe('when given a SET statment for a one dimensional array', () => {
        const tokens = [
            MockToken_1.default(Types_1.TokenType.SET), MockToken_1.default(Types_1.TokenType.IDENTIFIER, 'foo'),
            MockToken_1.default(Types_1.TokenType.LEFT_BRACE),
            MockToken_1.default(Types_1.TokenType.NUMBER, 2),
            MockToken_1.default(Types_1.TokenType.RIGHT_BRACE),
            MockToken_1.default(Types_1.TokenType.EQUAL), MockToken_1.default(Types_1.TokenType.NUMBER, 2),
            MockToken_1.default(Types_1.TokenType.NEWLINE), MockToken_1.default(Types_1.TokenType.EOF)
        ];
        test('it returns a set array statement', () => {
            const parser = new _1.default(jest.fn(), tokens);
            const stmt = Statement_1.default(parser);
            expect(stmt).toBeInstanceOf(Stmt_1.SetArrayStmt);
        });
    });
    describe('when given an INPUT statement', () => {
        const tokens = [
            MockToken_1.default(Types_1.TokenType.INPUT), MockToken_1.default(Types_1.TokenType.IDENTIFIER, 'foo'), MockToken_1.default(Types_1.TokenType.STRING, 'bar'),
            MockToken_1.default(Types_1.TokenType.NEWLINE), MockToken_1.default(Types_1.TokenType.EOF)
        ];
        test('it returns an input statement for foo with a prompt of bar', () => {
            const parser = new _1.default(jest.fn(), tokens);
            const stmt = Statement_1.default(parser);
            expect(stmt).toBeInstanceOf(Stmt_1.InputStmt);
            const inputStmt = stmt;
            expect(inputStmt.name.lexeme).toEqual('foo');
            expect(inputStmt.prompt).toBeInstanceOf(Expr_1.LiteralExpr);
            const inputStmtPrompt = inputStmt.prompt;
            expect(inputStmtPrompt.value).toEqual('bar');
        });
    });
    describe('when given a DEF statement', () => {
        const tokens = [
            MockToken_1.default(Types_1.TokenType.DEF), MockToken_1.default(Types_1.TokenType.IDENTIFIER, 'foo'),
            MockToken_1.default(Types_1.TokenType.LEFT_PAREN), MockToken_1.default(Types_1.TokenType.IDENTIFIER, 'bar'), MockToken_1.default(Types_1.TokenType.RIGHT_PAREN), MockToken_1.default(Types_1.TokenType.NEWLINE),
            MockToken_1.default(Types_1.TokenType.PRINT), MockToken_1.default(Types_1.TokenType.IDENTIFIER, 'bar'), MockToken_1.default(Types_1.TokenType.NEWLINE),
            MockToken_1.default(Types_1.TokenType.DEND),
            MockToken_1.default(Types_1.TokenType.NEWLINE), MockToken_1.default(Types_1.TokenType.EOF)
        ];
        test('it returns a function statement', () => {
            const parser = new _1.default(jest.fn(), tokens);
            const stmt = Statement_1.default(parser);
            expect(stmt).toBeInstanceOf(Stmt_1.FunctionStmt);
            const functionStmt = stmt;
            expect(functionStmt.name.lexeme).toEqual('foo');
            expect(functionStmt.body.length).toEqual(1);
            expect(functionStmt.body[0]).toBeInstanceOf(Stmt_1.PrintStmt);
            expect(functionStmt.params.length).toEqual(1);
            expect(functionStmt.params[0].lexeme).toEqual('bar');
        });
    });
});
