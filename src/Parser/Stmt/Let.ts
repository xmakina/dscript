import Parser from '..'
import { Stmt, LetStmt } from '../../AST'
import { TokenType } from '../../Types'
import Assign from '../Expr/Assign'

export default (parser: Parser): Stmt => {
  const name = parser.consume(TokenType.IDENTIFIER, 'Expect variable name.')
  parser.consume(TokenType.EQUAL, 'Expect equal after variable name.')
  const initializer = Assign(parser)

  parser.consume(TokenType.NEWLINE, 'Expect new line after variable declaration.')
  return new LetStmt(name, initializer)
}
