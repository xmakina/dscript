import { LetStmt, LiteralExpr } from '../../AST'
import { TokenType } from '../../Types'
import MockEnvironment from '../../Utils/MockEnvironment'
import MockOutput from '../../Utils/MockOutput'
import MockToken from '../../Utils/MockToken'
import Interpreter from '../Interpreter'

describe('when given a let statement', () => {
  const fooToken = MockToken(TokenType.IDENTIFIER, 'foo')

  test('should define foo as bar', async () => {
    const interpreter = new Interpreter(MockOutput, jest.fn(), MockEnvironment)
    await interpreter.visitLetStmt(new LetStmt(fooToken, new LiteralExpr('bar')))
    expect(MockEnvironment.define).toBeCalledWith('foo', 'bar')
  })
})
