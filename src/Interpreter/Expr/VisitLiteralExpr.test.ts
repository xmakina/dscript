import { LiteralExpr } from '../../AST'
import MockEnvironment from '../../Utils/MockEnvironment'
import MockOutput from '../../Utils/MockOutput'
import Interpreter from '../Interpreter'

describe('with simple expressions', () => {
  let interpreter: Interpreter

  beforeEach(() => {
    interpreter = new Interpreter(MockOutput, jest.fn(), MockEnvironment)
  })

  test('when given a grouping expression', async () => {
    expect(await new LiteralExpr(true).accept(interpreter)).toEqual(true)
  })
})
