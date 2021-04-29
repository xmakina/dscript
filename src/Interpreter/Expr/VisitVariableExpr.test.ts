import { VariableExpr } from '../../AST'
import { Token } from '../../Scanner/Token'
import { TokenType } from '../../Types'
import MockEnvironment from '../../Utils/MockEnvironment'
import MockOutput from '../../Utils/MockOutput'
import MockToken from '../../Utils/MockToken'
import Interpreter from '../Interpreter'

describe('with variable expression', () => {
  let interpreter: Interpreter
  beforeEach(() => {
    jest.clearAllMocks()

    MockEnvironment.get = jest.fn().mockImplementation((name: Token) => name.lexeme === 'foo' ? 'bar' : undefined)

    interpreter = new Interpreter(MockOutput, jest.fn(), MockEnvironment)
    interpreter.environment = MockEnvironment
  })

  describe('with a set variable', () => {
    test('returns the variable value', async () => {
      expect(await new VariableExpr(MockToken(TokenType.IDENTIFIER, 'foo')).accept(interpreter)).toEqual('bar')
    })
  })
})
