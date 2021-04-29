import { Stmt, SetStmt, SetArrayStmt } from '../../AST'
import { Token } from '../../Scanner/Token'
import { TokenType } from '../../Types'
import Expression from '../Expr/Expression'
import Parser from '../Parser'

export default function Set (parser: Parser): Stmt {
  const name = parser.consume(TokenType.IDENTIFIER, 'Expect variable name.')
  if (parser.match(TokenType.LEFT_BRACE)) {
    return setArrayStatement(name)
  }

  parser.consume(TokenType.EQUAL, 'Expect equal after variable name.')
  const value = Expression(parser)

  parser.consume(TokenType.NEWLINE, 'Expect new line after variable declaration.')
  return new SetStmt(name, value)

  function setArrayStatement (name: Token): Stmt {
    const index = Expression(parser)

    parser.consume(TokenType.RIGHT_BRACE, `Expect ']' to close out index list, got ${TokenType[parser.peek().type]}.`)
    parser.consume(TokenType.EQUAL, 'Expect equal after variable name.')

    const value = Expression(parser)
    return new SetArrayStmt(name, index, value)
  }
}
