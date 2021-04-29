import { ArrayAssignExpr, LiteralExpr } from '../../AST'
import { TokenType } from '../../Types'
import MockOutput from '../../Utils/MockOutput'
import MockToken from '../../Utils/MockToken'
import { Transpiler } from '../Transpiler'

describe('with array assignment expression', () => {
  const expr = new ArrayAssignExpr(MockToken(TokenType.IDENTIFIER, 'foo'), new LiteralExpr(1), new LiteralExpr('bar'))

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('creates the correct array assignment', () => {
    const result = new Transpiler(MockOutput, jest.fn()).transpile(expr)
    expect(result).toEqual('foo[1] = "bar"')
  })
})
