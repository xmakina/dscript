import theoretically from 'jest-theories'
import { LogicalExpr, LiteralExpr } from '../../AST'
import { TokenType } from '../../Types'
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

describe('when given logical expressions', () => {
  let interpreter: Interpreter

  const theories = [
    { input: { left: true, operator: TokenType.AND, right: true }, expected: true },
    { input: { left: true, operator: TokenType.AND, right: false }, expected: false },
    { input: { left: false, operator: TokenType.AND, right: false }, expected: false },
    { input: { left: true, operator: TokenType.OR, right: true }, expected: true },
    { input: { left: true, operator: TokenType.OR, right: false }, expected: true },
    { input: { left: false, operator: TokenType.OR, right: false }, expected: false }
  ]

  const name = ({ input, expected }: Theory<BinaryTestSetup>): string =>
    `when given ${JSON.stringify(input.left)} ${TokenType[input.operator]} ${JSON.stringify(input.right)}, it evaluates to ${expected.toString()}`

  beforeEach(() => {
    interpreter = new Interpreter(MockOutput, jest.fn(), MockEnvironment)
  })

  theoretically(name, theories, async (theory) => {
    const expr = new LogicalExpr(new LiteralExpr(theory.input.left), MockToken(theory.input.operator), new LiteralExpr(theory.input.right))
    expect(await expr.accept(interpreter)).toEqual(theory.expected)
  })
})
