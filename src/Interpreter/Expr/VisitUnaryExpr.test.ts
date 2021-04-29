import theoretically from 'jest-theories'
import { Expr, UnaryExpr, LiteralExpr } from '../../AST'
import { TokenType } from '../../Types'
import MockEnvironment from '../../Utils/MockEnvironment'
import MockOutput from '../../Utils/MockOutput'
import MockToken from '../../Utils/MockToken'

import Interpreter from '../Interpreter'

interface Theory<T> {
  input: T
  expected: number | string | boolean
}

describe('with simple expressions', () => {
  let interpreter: Interpreter

  const theories: Array<Theory<Expr>> = [
    { input: new UnaryExpr(MockToken(TokenType.MINUS), new LiteralExpr(1)), expected: -1 },
    { input: new UnaryExpr(MockToken(TokenType.BANG), new LiteralExpr(false)), expected: true }
  ]

  const name = ({ input, expected }: Theory<Expr>): string => `when given ${input.constructor.name}, it evaluates to ${expected.toString()}`

  beforeEach(() => {
    interpreter = new Interpreter(MockOutput, jest.fn(), MockEnvironment)
  })

  theoretically(name, theories, async (theory) => {
    expect(await theory.input.accept(interpreter)).toEqual(theory.expected)
  })
})
