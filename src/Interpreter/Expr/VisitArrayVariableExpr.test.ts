import { ArrayVariableExpr, LiteralExpr } from '../../AST'
import { Token } from '../../Scanner/Token'
import { TokenType } from '../../Types'
import MockEnvironment from '../../Utils/MockEnvironment'
import MockOutput from '../../Utils/MockOutput'
import MockToken from '../../Utils/MockToken'
import Interpreter from '../Interpreter'

describe('with an array variable expression', () => {
  let interpreter: Interpreter
  const mockGet = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    MockEnvironment.get = mockGet
    mockGet.mockImplementation((name: Token) => name.lexeme === 'foo' ? [1, 2] : undefined)

    interpreter = new Interpreter(MockOutput, jest.fn(), MockEnvironment)
    interpreter.environment = MockEnvironment
  })

  test('returns the array index value value', async () => {
    expect(await new ArrayVariableExpr(MockToken(TokenType.IDENTIFIER, 'foo'), new LiteralExpr(0)).accept(interpreter)).toEqual(1)
    expect(await new ArrayVariableExpr(MockToken(TokenType.IDENTIFIER, 'foo'), new LiteralExpr(1)).accept(interpreter)).toEqual(2)
  })
})
