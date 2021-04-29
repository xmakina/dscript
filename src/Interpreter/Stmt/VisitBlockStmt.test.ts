import { BlockStmt } from '../../AST'
import MockEnvironment from '../../Utils/MockEnvironment'
import MockOutput from '../../Utils/MockOutput'
import Interpreter from '../Interpreter'

describe('when given a block statement', () => {
  test('it processes the block', () => {
    const interpreter = new Interpreter(MockOutput, jest.fn(), MockEnvironment)
    expect(async () => await interpreter.visitBlockStmt(new BlockStmt([]))).not.toThrow()
  })
})
