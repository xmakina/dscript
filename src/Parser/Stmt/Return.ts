import Parser from '..'
import { Expr, ReturnStmt } from '../../AST'
import { TokenType } from '../../Types'
import Expression from '../Expr/Expression'

export default (parser: Parser): ReturnStmt => {
  const keyword = parser.previous()
  let value: Expr|null = null
  if (!parser.check(TokenType.NEWLINE)) {
    value = Expression(parser)
  }

  parser.consume(TokenType.NEWLINE, 'Expect newline after return value.')

  return new ReturnStmt(keyword, value)
}
