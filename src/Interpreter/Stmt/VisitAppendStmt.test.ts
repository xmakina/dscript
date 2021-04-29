import { AppendStmt, LiteralExpr } from '../../AST'
import MockEnvironment from '../../Utils/MockEnvironment'
import MockOutput from '../../Utils/MockOutput'
import Interpreter from '../Interpreter'

describe('when given an append statement', () => {
  test('output told to append hello world', async () => {
    const interpreter = new Interpreter(MockOutput, jest.fn(), MockEnvironment)
    await interpreter.visitAppendStmt(new AppendStmt(new LiteralExpr('Hello world!')))

    expect(MockOutput.append).toBeCalledWith('Hello world!')
  })
})
