import Parser from '..'
import { Expr, BinaryExpr } from '../../AST'
import { TokenType } from '../../Types'
import Factor from './Factor'

export default (parser: Parser): Expr => {
  let expr = Factor(parser)

  while (parser.match(TokenType.MINUS, TokenType.PLUS)) {
    const operator = parser.previous()
    const right = Factor(parser)
    expr = new BinaryExpr(expr, operator, right)
  }

  return expr
}
