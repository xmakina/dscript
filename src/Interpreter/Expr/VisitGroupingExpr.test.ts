import { GroupingExpr, LiteralExpr } from '../../AST'
import MockEnvironment from '../../Utils/MockEnvironment'
import MockOutput from '../../Utils/MockOutput'
import Interpreter from '../Interpreter'

describe('with simple expressions', () => {
  let subject: Interpreter

  beforeEach(() => {
    subject = new Interpreter(MockOutput, jest.fn(), MockEnvironment)
  })

  test('when given a grouping expression', async () => {
    const expr = new GroupingExpr(new LiteralExpr(true))
    expect(await expr.accept(subject)).toEqual(true)
  })
})
