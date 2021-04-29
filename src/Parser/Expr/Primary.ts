import Parser from '..'
import { Expr, LiteralExpr, ArrayVariableExpr, VariableExpr, GroupingExpr } from '../../AST'
import { TokenType, ParseError } from '../../Types'
import Expression from './Expression'

export default (parser: Parser): Expr => {
  if (parser.match(TokenType.FALSE)) return new LiteralExpr(false)
  if (parser.match(TokenType.TRUE)) return new LiteralExpr(true)
  if (parser.match(TokenType.NULL)) return new LiteralExpr(null)
  if (parser.match(TokenType.IDENTIFIER)) {
    const name = parser.previous()

    if (parser.match(TokenType.LEFT_BRACE)) {
      const index = Expression(parser)
      parser.consume(TokenType.RIGHT_BRACE, "Expect ']' after index.")
      return new ArrayVariableExpr(name, index)
    }

    return new VariableExpr(name)
  }

  if (parser.match(TokenType.NUMBER, TokenType.STRING)) {
    return new LiteralExpr(parser.previous().literal)
  }

  if (parser.match(TokenType.LEFT_PAREN)) {
    const expr = Expression(parser)
    parser.consume(TokenType.RIGHT_PAREN, "Expect ')' after expression.")
    return new GroupingExpr(expr)
  }

  throw new ParseError(parser.peek(), `Expected expression, got ${TokenType[parser.peek().type]}.`)
}
