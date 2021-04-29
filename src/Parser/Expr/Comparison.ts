import Parser from '..'
import { Expr, BinaryExpr } from '../../AST'
import { TokenType } from '../../Types'
import Term from './Term'

export default (parser: Parser): Expr => {
  let expr = Term(parser)

  while (parser.match(TokenType.GREATER, TokenType.GREATER_EQUAL, TokenType.LESS, TokenType.LESS_EQUAL)) {
    const operator = parser.previous()
    const right = Term(parser)
    expr = new BinaryExpr(expr, operator, right)
  }

  return expr
}
