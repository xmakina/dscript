import { LiteralExpr, SetStmt } from '../../AST'
import { TokenType } from '../../Types'
import MockEnvironment from '../../Utils/MockEnvironment'
import MockOutput from '../../Utils/MockOutput'
import MockToken from '../../Utils/MockToken'
import Interpreter from '../Interpreter'

describe('when given a set statement', () => {
  const fooToken = MockToken(TokenType.IDENTIFIER, 'foo')

  test('should set foo to bar', async () => {
    const interpreter = new Interpreter(MockOutput, jest.fn(), MockEnvironment)
    await interpreter.visitSetStmt(new SetStmt(fooToken, new LiteralExpr('flim')))

    expect(MockEnvironment.assign).toBeCalledWith(fooToken, 'flim')
  })
})
