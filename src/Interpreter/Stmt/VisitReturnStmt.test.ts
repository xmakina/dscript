import { LiteralExpr, ReturnStmt } from '../../AST'
import { DScriptFunction, TokenType } from '../../Types'
import MockEnvironment from '../../Utils/MockEnvironment'
import MockOutput from '../../Utils/MockOutput'
import MockToken from '../../Utils/MockToken'
import Interpreter from '../Interpreter'

describe('when given a return statement', () => {
  test('throws a return', async () => {
    const interpreter = new Interpreter(MockOutput, jest.fn(), MockEnvironment)
    const returnStmt = new ReturnStmt(MockToken(TokenType.IDENTIFIER, 'foo'), new LiteralExpr('bar'))

    await expect(interpreter.visitReturnStmt(returnStmt))
      .rejects
      .toThrow(DScriptFunction.Return)
  })
})
