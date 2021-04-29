import { ReplaceStmt, LiteralExpr } from '../../AST'
import MockEnvironment from '../../Utils/MockEnvironment'
import MockOutput from '../../Utils/MockOutput'
import Interpreter from '../Interpreter'

describe('when given a replace statement', () => {
  test('output told to replace hello world', async () => {
    const interpreter = new Interpreter(MockOutput, jest.fn(), MockEnvironment)
    await interpreter.visitReplaceStmt(new ReplaceStmt(new LiteralExpr('Hello world!')))

    expect(MockOutput.replace).toBeCalledWith('Hello world!')
  })
})
