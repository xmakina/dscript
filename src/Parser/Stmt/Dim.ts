import Parser from '..'
import { DimStmt } from '../../AST'
import { TokenType } from '../../Types'

export default (parser: Parser): DimStmt => {
  const name = parser.consume(TokenType.IDENTIFIER, 'Expect variable name.')
  parser.consume(TokenType.NEWLINE, 'Expect new line after variable declaration.')
  return new DimStmt(name)
}
