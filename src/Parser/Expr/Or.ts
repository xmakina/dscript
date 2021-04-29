import Parser from '..'
import { Expr, LogicalExpr } from '../../AST'
import { TokenType } from '../../Types'
import And from './And'

export default (parser: Parser): Expr => {
  let expr = And(parser)

  while (parser.match(TokenType.OR)) {
    const operator = parser.previous()
    const right = And(parser)
    expr = new LogicalExpr(expr, operator, right)
  }

  return expr
}
