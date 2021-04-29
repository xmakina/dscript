import Parser from '..'
import { BlockStmt, Stmt } from '../../AST'
import { TokenType } from '../../Types'
import Statement from './Statement'

export default (parser: Parser) => (endToken: TokenType, expectNewLine = true): BlockStmt => {
  const statements: Stmt[] = []

  while (!parser.check(endToken) && !parser.isAtEnd()) {
    if (parser.match(TokenType.NEWLINE)) {
      // swallow the newline
    } else {
      statements.push(Statement(parser))
    }
  }

  parser.consume(endToken, `Expect '${TokenType[endToken]}'.`)
  if (expectNewLine) {
    parser.consume(TokenType.NEWLINE, `Expect new line after '${TokenType[endToken]}'.`)
  }

  return new BlockStmt(statements)
}
