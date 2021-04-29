import Parser from '..'
import { Expr, BinaryExpr } from '../../AST'
import { TokenType } from '../../Types'
import Comparison from './Comparison'

export default (parser: Parser): Expr => {
  let expr = Comparison(parser)

  while (parser.match(TokenType.UNEQUAL, TokenType.EQUAL)) {
    const operator = parser.previous()
    const right = Comparison(parser)
    expr = new BinaryExpr(expr, operator, right)
  }

  return expr
}
