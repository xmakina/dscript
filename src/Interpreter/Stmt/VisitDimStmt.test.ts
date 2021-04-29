import { DimStmt } from '../../AST'
import { TokenType } from '../../Types'
import MockEnvironment from '../../Utils/MockEnvironment'
import MockOutput from '../../Utils/MockOutput'
import MockToken from '../../Utils/MockToken'
import Interpreter from '../Interpreter'

describe('when given a dim statement', () => {
  test('sets the array', async () => {
    const interpreter = new Interpreter(MockOutput, jest.fn(), MockEnvironment)
    interpreter.environment = MockEnvironment
    const fooToken = MockToken(TokenType.IDENTIFIER, 'foo')
    await interpreter.visitDimStmt(new DimStmt(fooToken))

    expect(interpreter.environment.define).toBeCalledWith(fooToken, [])
  })
})
