import { LiteralExpr, InputStmt } from '../../AST'
import { TokenType } from '../../Types'
import MockEnvironment from '../../Utils/MockEnvironment'
import MockOutput from '../../Utils/MockOutput'
import MockToken from '../../Utils/MockToken'
import Interpreter from '../Interpreter'

describe('with input statement', () => {
  const fooToken = MockToken(TokenType.IDENTIFIER, 'foo')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('when user input will be flim', () => {
    let expectedPrompt: string
    let interpreter: Interpreter

    beforeEach(() => {
      MockOutput.prompt = async (prompt: string): Promise<string> => {
        expectedPrompt = prompt
        const promise = new Promise<string>((resolve) => {
          setTimeout(() => resolve('flim'), 1000)
        })

        return promise
      }

      interpreter = new Interpreter(MockOutput, jest.fn(), MockEnvironment)
    })

    test('should prompt with bar and then set foo to "flim"', async () => {
      await interpreter.visitInputStmt(new InputStmt(fooToken, new LiteralExpr('bar')))
      expect(expectedPrompt).toEqual('bar')
      expect(MockEnvironment.define).toHaveBeenLastCalledWith('foo', 'flim')
    })
  })

  describe('when user input will be 99.99', () => {
    let interpreter: Interpreter

    beforeEach(() => {
      MockOutput.prompt = async (): Promise<string> => {
        const promise = new Promise<string>((resolve) => {
          setTimeout(() => resolve('99.99'), 1000)
        })

        return promise
      }

      interpreter = new Interpreter(MockOutput, jest.fn(), MockEnvironment)
    })

    test('should set foo to 99.99', async () => {
      await interpreter.visitInputStmt(new InputStmt(fooToken, new LiteralExpr('bar')))
      expect(MockEnvironment.define).toHaveBeenLastCalledWith('foo', 99.99)
    })
  })

  describe('when user input will be 1', () => {
    let interpreter: Interpreter

    beforeEach(() => {
      MockOutput.prompt = async (): Promise<string> => {
        const promise = new Promise<string>((resolve) => {
          setTimeout(() => resolve('1'), 1000)
        })

        return promise
      }

      interpreter = new Interpreter(MockOutput, jest.fn(), MockEnvironment)
    })

    test('should set foo to 1', async () => {
      await interpreter.visitInputStmt(new InputStmt(fooToken, new LiteralExpr('bar')))
      expect(MockEnvironment.define).toHaveBeenLastCalledWith('foo', 1)
    })
  })

  describe('when user input will be -1', () => {
    let interpreter: Interpreter

    beforeEach(() => {
      MockOutput.prompt = async (): Promise<string> => {
        const promise = new Promise<string>((resolve) => {
          setTimeout(() => resolve('-1'), 1000)
        })

        return promise
      }

      interpreter = new Interpreter(MockOutput, jest.fn(), MockEnvironment)
    })

    test('should set foo to -1', async () => {
      await interpreter.visitInputStmt(new InputStmt(fooToken, new LiteralExpr('bar')))
      expect(MockEnvironment.define).toHaveBeenLastCalledWith('foo', -1)
    })
  })
})
