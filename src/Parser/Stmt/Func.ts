import { FunctionStmt, Stmt } from '../../AST'
import { Token } from '../../Scanner/Token'
import { TokenType, ParseError } from '../../Types'
import Parser from '../Parser'
import Block from './Block'

export default function Func (parser: Parser): Stmt {
  const name = parser.consume(TokenType.IDENTIFIER, 'Expect function name.')
  parser.consume(TokenType.LEFT_PAREN, "Expect '(' after function name.")
  const parameters: Token[] = []

  if (!parser.check(TokenType.RIGHT_PAREN)) {
    do {
      if (parameters.length >= 255) {
        throw new ParseError(name, "Can't have more than 255 parameters.")
      }

      parameters.push(parser.consume(TokenType.IDENTIFIER, 'Expect parameter name.'))
    } while (parser.match(TokenType.COMMA))
  }

  parser.consume(TokenType.RIGHT_PAREN, "Expect ')' after parameters.")
  parser.consume(TokenType.NEWLINE, 'Expect newline after DEF.')

  const body = Block(parser)(TokenType.DEND)
  return new FunctionStmt(name, parameters, body.statements)
}
