import { AppendStmt, LiteralExpr } from '../../AST'
import MockOutput from '../../Utils/MockOutput'
import { Transpiler } from '../Transpiler'

describe('with the append statement', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('returns executable code', () => {
    const stmt = new AppendStmt(new LiteralExpr('Hello!'))
    const result = new Transpiler(MockOutput, jest.fn()).transpile(stmt)

    expect(result).toEqual('output.append("Hello!");')
  })
})
