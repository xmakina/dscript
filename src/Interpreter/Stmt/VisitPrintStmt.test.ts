import { PrintStmt, LiteralExpr } from '../../AST'
import MockEnvironment from '../../Utils/MockEnvironment'
import MockOutput from '../../Utils/MockOutput'
import Interpreter from '../Interpreter'

describe('when given a print statement', () => {
  test('output told to print hello world', async () => {
    const interpreter = new Interpreter(MockOutput, jest.fn(), MockEnvironment)
    await interpreter.visitPrintStmt(new PrintStmt(new LiteralExpr('Hello world!')))

    expect(MockOutput.print).toBeCalledWith('Hello world!')
  })
})
