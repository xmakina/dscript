import Parser from '..'
import { Expr, BinaryExpr } from '../../AST'
import { TokenType } from '../../Types'
import Unary from './Unary'

export default (parser: Parser): Expr => {
  let expr = Unary(parser)

  while (parser.match(TokenType.SLASH, TokenType.STAR)) {
    const operator = parser.previous()
    const right = Unary(parser)
    expr = new BinaryExpr(expr, operator, right)
  }

  return expr
}
