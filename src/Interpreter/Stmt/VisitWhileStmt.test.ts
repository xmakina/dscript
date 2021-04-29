import { VariableExpr, LetStmt, LiteralExpr, WhileStmt, BinaryExpr, ExpressionStmt } from '../../AST'
import { TokenType } from '../../Types'
import MockEnvironment from '../../Utils/MockEnvironment'
import MockOutput from '../../Utils/MockOutput'
import MockToken from '../../Utils/MockToken'
import Interpreter from '../Interpreter'

describe('when given a while loop', () => {
  const fooToken = MockToken(TokenType.IDENTIFIER, 'foo')
  const fooVariable = new VariableExpr(fooToken)

  beforeEach(() => {
    jest.clearAllMocks()
    MockEnvironment.get = jest.fn()
      .mockReturnValueOnce(1)
      .mockReturnValueOnce(2)
      .mockReturnValueOnce(3)
  })

  test('should run three times', async () => {
    const interpreter = new Interpreter(MockOutput, jest.fn(), MockEnvironment)

    await interpreter.visitLetStmt(new LetStmt(fooToken, new LiteralExpr(0)))
    await interpreter.visitWhileStmt(new WhileStmt(
      new BinaryExpr(fooVariable, MockToken(TokenType.LESS), new LiteralExpr(3)),
      new ExpressionStmt(new LiteralExpr(1))
    ))
  })
})
