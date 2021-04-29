import { LiteralExpr } from '../../AST'
import MockOutput from '../../Utils/MockOutput'
import { Transpiler } from '../Transpiler'

describe('with the append statement', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('returns the literal value', () => {
    const expr = new LiteralExpr('Hello!')
    const result = new Transpiler(MockOutput, jest.fn()).transpile(expr)

    expect(result).toEqual('"Hello!"')
  })
})
