import Parser from '..'
import { Expr, LogicalExpr } from '../../AST'
import { TokenType } from '../../Types'
import Equality from './Equality'

export default function And (parser: Parser): Expr {
  let expr = Equality(parser)

  while (parser.match(TokenType.AND)) {
    const operator = parser.previous()
    const right = And(parser)
    expr = new LogicalExpr(expr, operator, right)
  }

  return expr
}
