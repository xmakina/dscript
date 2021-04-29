import { FunctionStmt } from '../../AST'
import { TokenType } from '../../Types'
import MockEnvironment from '../../Utils/MockEnvironment'
import MockOutput from '../../Utils/MockOutput'
import MockToken from '../../Utils/MockToken'
import Interpreter from '../Interpreter'

describe('when given a dim statement', () => {
  test('sets the array', async () => {
    const interpreter = new Interpreter(MockOutput, jest.fn(), MockEnvironment)
    interpreter.environment = MockEnvironment

    await interpreter.visitFunctionStmt(new FunctionStmt(MockToken(TokenType.IDENTIFIER, 'foo'), [], []))

    expect(interpreter.environment.define).toBeCalled()
  })
})
