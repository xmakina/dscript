import Parser from '..'
import { AssignExpr, Expr, VariableExpr } from '../../AST'
import { ParseError, TokenType } from '../../Types'
import Or from './Or'

export default function Assign (parser: Parser): Expr {
  const expr = Or(parser)
  if (parser.match(TokenType.EQUAL)) {
    const equals = parser.previous()
    const value = Assign(parser)

    if (expr instanceof VariableExpr) {
      const name = expr.name
      return new AssignExpr(name, value)
    }

    throw new ParseError(equals, 'Invalid assignment target.')
  }

  return expr
}
