import { SetArrayStmt, LiteralExpr } from '../../AST'
import { TokenType } from '../../Types'
import MockEnvironment from '../../Utils/MockEnvironment'
import MockOutput from '../../Utils/MockOutput'
import MockToken from '../../Utils/MockToken'
import Interpreter from '../Interpreter'

describe('when given a dim statement', () => {
  const fooToken = MockToken(TokenType.IDENTIFIER, 'foo')

  beforeEach(() => {
    jest.clearAllMocks()
    MockEnvironment.get = jest.fn().mockReturnValue([])
  })

  test('should set foo(0) to bar', async () => {
    const interpreter = new Interpreter(MockOutput, jest.fn(), MockEnvironment)
    await interpreter.visitSetArrayStmt(new SetArrayStmt(fooToken, new LiteralExpr(0), new LiteralExpr('bar')))

    expect(MockEnvironment.get).toBeCalledWith(fooToken)
    expect(MockEnvironment.assign).toBeCalledWith(fooToken, ['bar'])
  })
})
