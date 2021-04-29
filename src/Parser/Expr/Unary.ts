import Parser from '..'
import { Expr, UnaryExpr } from '../../AST'
import { TokenType } from '../../Types'
import Call from './Call'

export default function Unary (parser: Parser): Expr {
  if (parser.match(TokenType.BANG, TokenType.MINUS)) {
    const operator = parser.previous()
    const right = Unary(parser)
    return new UnaryExpr(operator, right)
  }

  return Call(parser)
}
