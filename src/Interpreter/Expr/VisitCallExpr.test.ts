import { CallExpr, VariableExpr } from '../../AST'
import { DScriptCallable, TokenType } from '../../Types'
import MockEnvironment from '../../Utils/MockEnvironment'
import MockOutput from '../../Utils/MockOutput'
import MockToken from '../../Utils/MockToken'
import Interpreter from '../Interpreter'

describe('with simple expressions', () => {
  let subject: Interpreter
  class MockFunction extends DScriptCallable {
    call = jest.fn()
    arity = (): number => 0
    toString = (): string => ''
  }

  const mockFunction = new MockFunction()

  beforeEach(() => {
    jest.clearAllMocks()

    subject = new Interpreter(MockOutput, jest.fn(), MockEnvironment)
    MockEnvironment.get = () => mockFunction
    subject.environment = MockEnvironment
  })

  test('when given a function expression', async () => {
    const expr = new CallExpr(new VariableExpr(MockToken(TokenType.IDENTIFIER, 'foo')), MockToken(TokenType.IDENTIFIER, 'foo'), [])
    await expr.accept(subject)
    expect(mockFunction.call).toBeCalled()
  })
})
