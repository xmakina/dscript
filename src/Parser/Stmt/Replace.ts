import { ReplaceStmt, Stmt } from '../../AST'
import { TokenType } from '../../Types'
import Expression from '../Expr/Expression'
import Parser from '../Parser'

export default function Replace (parser: Parser): Stmt {
  const value = Expression(parser)
  parser.consume(TokenType.NEWLINE, 'Expect new line after value.')
  return new ReplaceStmt(value)
}
