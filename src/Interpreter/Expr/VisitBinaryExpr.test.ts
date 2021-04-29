import theoretically from 'jest-theories'
import { BinaryExpr, LiteralExpr } from '../../AST'
import { TokenType, RuntimeError } from '../../Types'
import MockEnvironment from '../../Utils/MockEnvironment'
import MockOutput from '../../Utils/MockOutput'
import MockToken from '../../Utils/MockToken'
import Interpreter from '../Interpreter'

interface Theory<T> {
  input: T
  expected: number | string | boolean
}

interface BinaryTestSetup {
  left: number | string | boolean
  operator: TokenType
  right: number | string | boolean
}

describe('when given a BinaryExpr', () => {
  let interpreter: Interpreter

  beforeEach(() => {
    interpreter = new Interpreter(MockOutput, jest.fn(), MockEnvironment)
  })

  describe('when given correct operands', () => {
    const theories: Array<Theory<BinaryTestSetup>> = [
      { input: { left: 4, operator: TokenType.MINUS, right: 1 }, expected: 3 },
      { input: { left: 4, operator: TokenType.SLASH, right: 2 }, expected: 2 },
      { input: { left: 4, operator: TokenType.STAR, right: 2 }, expected: 8 },
      { input: { left: 4, operator: TokenType.PLUS, right: 2 }, expected: 6 },
      { input: { left: 'a', operator: TokenType.PLUS, right: 'b' }, expected: 'ab' },
      { input: { left: 'one', operator: TokenType.PLUS, right: 4 }, expected: 'one4' },
      { input: { left: 4, operator: TokenType.PLUS, right: 'one' }, expected: '4one' },
      { input: { left: 1, operator: TokenType.GREATER, right: 2 }, expected: false },
      { input: { left: 2, operator: TokenType.GREATER, right: 1 }, expected: true },
      { input: { left: 2, operator: TokenType.GREATER_EQUAL, right: 2 }, expected: true },
      { input: { left: 1, operator: TokenType.LESS, right: 2 }, expected: true },
      { input: { left: 2, operator: TokenType.LESS, right: 1 }, expected: false },
      { input: { left: 2, operator: TokenType.LESS_EQUAL, right: 2 }, expected: true },
      { input: { left: 2, operator: TokenType.UNEQUAL, right: 2 }, expected: false },
      { input: { left: 1, operator: TokenType.UNEQUAL, right: 2 }, expected: true },
      { input: { left: 2, operator: TokenType.EQUAL, right: 2 }, expected: true },
      { input: { left: 1, operator: TokenType.EQUAL, right: 2 }, expected: false }]

    const name = ({ input, expected }: Theory<BinaryTestSetup>): string =>
      `when given ${JSON.stringify(input.left)} ${TokenType[input.operator]} ${JSON.stringify(input.right)}, it evaluates to ${expected.toString()}`

    theoretically(name, theories, async (theory) => {
      const expr = new BinaryExpr(new LiteralExpr(theory.input.left), MockToken(theory.input.operator), new LiteralExpr(theory.input.right))
      expect(await expr.accept(interpreter)).toEqual(theory.expected)
    })
  })

  describe('when given wrong operands', () => {
    interface Theory<T> {
      input: T
    }
    const theories: Array<Theory<BinaryTestSetup>> = [
      { input: { left: 'one', operator: TokenType.MINUS, right: 1 } },
      { input: { left: 'one', operator: TokenType.SLASH, right: 1 } },
      { input: { left: 'one', operator: TokenType.STAR, right: 1 } },
      { input: { left: 'one', operator: TokenType.GREATER_EQUAL, right: 1 } },
      { input: { left: 'one', operator: TokenType.GREATER, right: 1 } },
      { input: { left: 'one', operator: TokenType.LESS_EQUAL, right: 1 } },
      { input: { left: 'one', operator: TokenType.LESS, right: 1 } },
      { input: { left: 1, operator: TokenType.SLASH, right: 0 } }
    ]

    theoretically('bad operands throw runtime errors', theories, async (theory) => {
      const expr = new BinaryExpr(new LiteralExpr(theory.input.left), MockToken(theory.input.operator), new LiteralExpr(theory.input.right))
      await expect(expr.accept(interpreter)).rejects.toThrow(RuntimeError)
    })
  })
})
