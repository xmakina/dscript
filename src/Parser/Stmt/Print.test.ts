import { PrintStmt, LiteralExpr } from '../../AST'
import { TokenType } from '../../Types'
import MockToken from '../../Utils/MockToken'
import Parser from '../Parser'
import Print from './Print'

describe('when given print statement arguments', () => {
  const tokens = [MockToken(TokenType.STRING, 'Hello world!'), MockToken(TokenType.NEWLINE)]

  test('it returns a print statement', () => {
    const parser = new Parser(jest.fn(), tokens)
    const stmt = Print(parser)
    expect(stmt).toBeInstanceOf(PrintStmt)
    const printStmt = stmt as PrintStmt
    expect(printStmt.expression).toBeInstanceOf(LiteralExpr)
    expect((printStmt.expression as LiteralExpr).value).toEqual('Hello world!')
  })
})
