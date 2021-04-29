import Parser from '.'
import { BinaryExpr, LiteralExpr, VariableExpr } from '../AST/Expr'
import { AppendStmt, BlockStmt, DimStmt, FunctionStmt, IfStmt, InputStmt, LetStmt, PrintStmt, ReplaceStmt, SetArrayStmt, SetStmt, WhileStmt } from '../AST/Stmt'
import { TokenType } from '../Types'
import MockToken from '../Utils/MockToken'
import Statement from './Stmt/Statement'

describe('with statement parser', () => {
  describe('when given a print statement', () => {
    const tokens = [MockToken(TokenType.PRINT), MockToken(TokenType.STRING, 'Hello world!'), MockToken(TokenType.NEWLINE), MockToken(TokenType.EOF)]

    test('it returns a print statement', () => {
      const parser = new Parser(jest.fn(), tokens)
      const stmt = Statement(parser)
      expect(stmt).toBeInstanceOf(PrintStmt)
      expect((stmt as PrintStmt).expression).toBeInstanceOf(LiteralExpr)
      expect(((stmt as PrintStmt).expression as LiteralExpr).value).toEqual('Hello world!')
    })
  })

  describe('when given a concatenation PRINT statement', () => {
    const tokens = [MockToken(TokenType.PRINT),
      MockToken(TokenType.IDENTIFIER, 'foo'), MockToken(TokenType.PLUS), MockToken(TokenType.STRING, ' bar'),
      MockToken(TokenType.NEWLINE), MockToken(TokenType.EOF)]

    test('it returns a print statement', () => {
      const parser = new Parser(jest.fn(), tokens)
      const stmt = Statement(parser)
      expect(stmt).toBeInstanceOf(PrintStmt)
      const printStmt = stmt as PrintStmt
      expect(printStmt.expression).toBeInstanceOf(BinaryExpr)
      const printStmtExpression = printStmt.expression as BinaryExpr
      expect(printStmtExpression.left).toBeInstanceOf(VariableExpr)
      expect(printStmtExpression.right).toBeInstanceOf(LiteralExpr)
    })
  })

  describe('when given an append statement', () => {
    const tokens = [MockToken(TokenType.APPEND), MockToken(TokenType.STRING, 'foo'), MockToken(TokenType.NEWLINE), MockToken(TokenType.EOF)]

    test('it returns a print statement', () => {
      const parser = new Parser(jest.fn(), tokens)
      const stmt = Statement(parser)
      expect(stmt).toBeInstanceOf(AppendStmt)
      const appendStmt = stmt as AppendStmt
      expect(appendStmt.expression).toBeInstanceOf(LiteralExpr)
      expect((appendStmt.expression as LiteralExpr).value).toEqual('foo')
    })
  })

  describe('when given an reaplce statement', () => {
    const tokens = [MockToken(TokenType.REPLACE), MockToken(TokenType.STRING, 'foo'), MockToken(TokenType.NEWLINE), MockToken(TokenType.EOF)]

    test('it returns a print statement', () => {
      const parser = new Parser(jest.fn(), tokens)
      const stmt = Statement(parser)
      expect(stmt).toBeInstanceOf(ReplaceStmt)
      const replaceStmt = stmt as ReplaceStmt
      expect(replaceStmt.expression).toBeInstanceOf(LiteralExpr)
      expect((replaceStmt.expression as LiteralExpr).value).toEqual('foo')
    })
  })

  describe('when given a let statement', () => {
    const tokens = [MockToken(TokenType.LET), MockToken(TokenType.IDENTIFIER, 'foo'),
      MockToken(TokenType.EQUAL),
      MockToken(TokenType.STRING, 'bar'),
      MockToken(TokenType.NEWLINE), MockToken(TokenType.EOF)]

    test('it returns a let statement', () => {
      const parser = new Parser(jest.fn(), tokens)
      const stmt = Statement(parser)
      expect(stmt).toBeInstanceOf(LetStmt)
      expect((stmt as LetStmt).name.literal).toEqual('foo')
      expect((stmt as LetStmt).initializer).toBeInstanceOf(LiteralExpr)
      expect(((stmt as LetStmt).initializer as LiteralExpr).value).toEqual('bar')
    })
  })

  describe('when given an IF statement', () => {
    const tokens = [
      MockToken(TokenType.IF),
      MockToken(TokenType.IDENTIFIER, 'foo'), MockToken(TokenType.EQUAL), MockToken(TokenType.IDENTIFIER, 'bar'),
      MockToken(TokenType.THEN),
      MockToken(TokenType.SET), MockToken(TokenType.IDENTIFIER, '', 'flim'), MockToken(TokenType.EQUAL), MockToken(TokenType.STRING, 'flam'),
      MockToken(TokenType.NEWLINE), MockToken(TokenType.EOF)
    ]

    test('it returns an IF statement', () => {
      const parser = new Parser(jest.fn(), tokens)
      const stmt = Statement(parser)

      expect(stmt).toBeInstanceOf(IfStmt)
      expect((stmt as IfStmt).condition).toBeInstanceOf(BinaryExpr)
      expect((stmt as IfStmt).thenBranch).toBeInstanceOf(SetStmt)
      expect(((stmt as IfStmt).thenBranch as SetStmt).name.lexeme).toEqual('flim')
      expect(((stmt as IfStmt).thenBranch as SetStmt).value).toBeInstanceOf(LiteralExpr)
      expect((((stmt as IfStmt).thenBranch as SetStmt).value as LiteralExpr).value).toEqual('flam')
    })
  })

  describe('when given a while statement', () => {
    const tokens = [
      MockToken(TokenType.WHILE), MockToken(TokenType.IDENTIFIER, 'foo'), MockToken(TokenType.EQUAL), MockToken(TokenType.FALSE), MockToken(TokenType.NEWLINE),
      MockToken(TokenType.PRINT), MockToken(TokenType.STRING, 'bar'), MockToken(TokenType.NEWLINE),
      MockToken(TokenType.WEND),
      MockToken(TokenType.NEWLINE), MockToken(TokenType.EOF)
    ]

    test('it returns a WHILE statement', () => {
      const parser = new Parser(jest.fn(), tokens)
      const stmt = Statement(parser)

      expect(stmt).toBeInstanceOf(WhileStmt)
      expect((stmt as WhileStmt).condition).toBeInstanceOf(BinaryExpr)
      expect((stmt as WhileStmt).body).toBeInstanceOf(BlockStmt)
      expect(((stmt as WhileStmt).body as BlockStmt).statements.length).toEqual(1)
      expect(((stmt as WhileStmt).body as BlockStmt).statements[0]).toBeInstanceOf(PrintStmt)
    })
  })

  describe('when given a for statement', () => {
    const tokens = [
      MockToken(TokenType.FOR), MockToken(TokenType.IDENTIFIER, 'foo'), MockToken(TokenType.EQUAL), MockToken(TokenType.NUMBER, 0),
      MockToken(TokenType.TO), MockToken(TokenType.NUMBER, 4),
      MockToken(TokenType.STEP), MockToken(TokenType.NUMBER, 2),
      MockToken(TokenType.NEWLINE),
      MockToken(TokenType.PRINT), MockToken(TokenType.STRING, 'bar'), MockToken(TokenType.NEWLINE),
      MockToken(TokenType.NEXT), MockToken(TokenType.IDENTIFIER, 'foo'),
      MockToken(TokenType.NEWLINE), MockToken(TokenType.EOF)
    ]

    test('it returns a FOR statement', () => {
      const parser = new Parser(jest.fn(), tokens)
      const stmt = Statement(parser)

      expect(stmt).toBeInstanceOf(BlockStmt)
      const firstBlock = stmt as BlockStmt
      expect(firstBlock.statements[0]).toBeInstanceOf(LetStmt)
      const initializer = firstBlock.statements[0] as LetStmt
      expect(initializer.name.lexeme).toEqual('foo')
    })
  })

  describe('when given a dim statement', () => {
    const tokens = [
      MockToken(TokenType.DIM), MockToken(TokenType.IDENTIFIER, 'foo'),
      MockToken(TokenType.NEWLINE), MockToken(TokenType.EOF)
    ]

    test('it returns a DIM statement', () => {
      const parser = new Parser(jest.fn(), tokens)
      const stmt = Statement(parser)

      expect(stmt).toBeInstanceOf(DimStmt)
      const dimStmt = stmt as DimStmt
      expect(dimStmt.name.lexeme).toEqual('foo')
    })
  })

  describe('when given a SET statment for a one dimensional array', () => {
    const tokens = [
      MockToken(TokenType.SET), MockToken(TokenType.IDENTIFIER, 'foo'),
      MockToken(TokenType.LEFT_BRACE),
      MockToken(TokenType.NUMBER, 2),
      MockToken(TokenType.RIGHT_BRACE),
      MockToken(TokenType.EQUAL), MockToken(TokenType.NUMBER, 2),
      MockToken(TokenType.NEWLINE), MockToken(TokenType.EOF)
    ]

    test('it returns a set array statement', () => {
      const parser = new Parser(jest.fn(), tokens)
      const stmt = Statement(parser)

      expect(stmt).toBeInstanceOf(SetArrayStmt)
    })
  })

  describe('when given an INPUT statement', () => {
    const tokens = [
      MockToken(TokenType.INPUT), MockToken(TokenType.IDENTIFIER, 'foo'), MockToken(TokenType.STRING, 'bar'),
      MockToken(TokenType.NEWLINE), MockToken(TokenType.EOF)
    ]

    test('it returns an input statement for foo with a prompt of bar', () => {
      const parser = new Parser(jest.fn(), tokens)
      const stmt = Statement(parser)

      expect(stmt).toBeInstanceOf(InputStmt)
      const inputStmt = stmt as InputStmt
      expect(inputStmt.name.lexeme).toEqual('foo')
      expect(inputStmt.prompt).toBeInstanceOf(LiteralExpr)
      const inputStmtPrompt = inputStmt.prompt as LiteralExpr
      expect(inputStmtPrompt.value).toEqual('bar')
    })
  })

  describe('when given a DEF statement', () => {
    const tokens = [
      MockToken(TokenType.DEF), MockToken(TokenType.IDENTIFIER, 'foo'),
      MockToken(TokenType.LEFT_PAREN), MockToken(TokenType.IDENTIFIER, 'bar'), MockToken(TokenType.RIGHT_PAREN), MockToken(TokenType.NEWLINE),
      MockToken(TokenType.PRINT), MockToken(TokenType.IDENTIFIER, 'bar'), MockToken(TokenType.NEWLINE),
      MockToken(TokenType.DEND),
      MockToken(TokenType.NEWLINE), MockToken(TokenType.EOF)
    ]

    test('it returns a function statement', () => {
      const parser = new Parser(jest.fn(), tokens)
      const stmt = Statement(parser)

      expect(stmt).toBeInstanceOf(FunctionStmt)
      const functionStmt = stmt as FunctionStmt
      expect(functionStmt.name.lexeme).toEqual('foo')
      expect(functionStmt.body.length).toEqual(1)
      expect(functionStmt.body[0]).toBeInstanceOf(PrintStmt)

      expect(functionStmt.params.length).toEqual(1)
      expect(functionStmt.params[0].lexeme).toEqual('bar')
    })
  })
})
