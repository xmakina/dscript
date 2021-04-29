import { LetStmt, LiteralExpr, IfStmt, BinaryExpr, PrintStmt } from '../../AST'
import { TokenType } from '../../Types'
import MockEnvironment from '../../Utils/MockEnvironment'
import MockOutput from '../../Utils/MockOutput'
import MockToken from '../../Utils/MockToken'
import Interpreter from '../Interpreter'

describe('when given an if statement', () => {
  const fooToken = MockToken(TokenType.IDENTIFIER, 'foo')

  test('when the statement is true', async () => {
    const interpreter = new Interpreter(MockOutput, jest.fn(), MockEnvironment)
    await interpreter.visitLetStmt(new LetStmt(fooToken, new LiteralExpr('bar')))
    await interpreter.visitIfStmt(
      new IfStmt(
        new BinaryExpr(new LiteralExpr('foo'), MockToken(TokenType.EQUAL), new LiteralExpr('foo')),
        new PrintStmt(new LiteralExpr('is equal')),
        new PrintStmt(new LiteralExpr('not equal'))
      )
    )

    expect(MockOutput.print).toBeCalledWith('is equal')
  })

  test('when the statement is false', async () => {
    const interpreter = new Interpreter(MockOutput, jest.fn(), MockEnvironment)
    await interpreter.visitLetStmt(new LetStmt(fooToken, new LiteralExpr('flim')))
    await interpreter.visitIfStmt(
      new IfStmt(
        new BinaryExpr(new LiteralExpr('foo'), MockToken(TokenType.EQUAL), new LiteralExpr('bar')),
        new PrintStmt(new LiteralExpr('is equal')),
        new PrintStmt(new LiteralExpr('not equal'))
      )
    )

    expect(MockOutput.print).toBeCalledWith('not equal')
  })
})
