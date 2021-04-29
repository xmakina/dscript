import Parser from '..'
import { CallExpr } from '../../AST'
import { Token } from '../../Scanner/Token'
import { TokenType } from '../../Types'
import MockToken from '../../Utils/MockToken'
import Call from './Call'

describe('with the Call parser', () => {
  describe('with the parser', () => {
    const report = jest.fn()

    describe('when given an function call with no arguments', () => {
      const tokens = [
        MockToken(TokenType.IDENTIFIER, 'foo'),
        MockToken(TokenType.LEFT_PAREN),
        MockToken(TokenType.RIGHT_PAREN),
        MockToken(TokenType.NEWLINE), new Token(TokenType.EOF, '', null, 1)
      ]

      beforeEach(() => jest.clearAllMocks())

      test('returns an array accessing variable', () => {
        const parser = new Parser(report, tokens)
        const expr = Call(parser)
        expect(expr).toBeInstanceOf(CallExpr)
      })
    })
  })
})
