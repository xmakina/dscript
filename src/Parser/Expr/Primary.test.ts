import Parser from '..'
import { ArrayVariableExpr, LiteralExpr, VariableExpr } from '../../AST'
import { Token } from '../../Scanner/Token'
import { TokenType } from '../../Types'
import MockToken from '../../Utils/MockToken'
import Primary from './Primary'

describe('with the Primary parser', () => {
  const report = jest.fn()
  describe('when given a literal', () => {
    const tokens = [
      new Token(TokenType.NUMBER, '', 1, 1),
      new Token(TokenType.EOF, '', null, 1)
    ]

    beforeEach(() => jest.clearAllMocks())

    test('returns a literal', () => {
      const parser = new Parser(report, tokens)
      const expr = Primary(parser)
      expect((expr as LiteralExpr).value).toEqual(1)
    })
  })

  describe('when given a variable', () => {
    const tokens = [
      new Token(TokenType.IDENTIFIER, 'foo', 1, 1),
      new Token(TokenType.EOF, '', null, 1)
    ]

    beforeEach(() => jest.clearAllMocks())

    test('returns a variable', () => {
      const parser = new Parser(report, tokens)
      const expr = Primary(parser)
      expect((expr as VariableExpr).name.lexeme).toEqual('foo')
    })
  })

  describe('when given an array variable', () => {
    const tokens = [
      MockToken(TokenType.IDENTIFIER, 'foo'),
      MockToken(TokenType.LEFT_BRACE),
      MockToken(TokenType.NUMBER, 1),
      MockToken(TokenType.RIGHT_BRACE),
      MockToken(TokenType.NEWLINE), new Token(TokenType.EOF, '', null, 1)
    ]

    beforeEach(() => jest.clearAllMocks())

    test('returns an array accessing variable', () => {
      const parser = new Parser(report, tokens)
      const expr = Primary(parser)
      expect(expr).toBeInstanceOf(ArrayVariableExpr)
      const arrExpr = expr as ArrayVariableExpr
      expect(arrExpr.name.lexeme).toEqual('foo')
      expect(arrExpr.index).toBeInstanceOf(LiteralExpr)
      const indexExpr = arrExpr.index as LiteralExpr
      expect(indexExpr.value).toEqual(1)
    })
  })
})
