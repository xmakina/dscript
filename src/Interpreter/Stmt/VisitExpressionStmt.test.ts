import { ExpressionStmt, LiteralExpr } from '../../AST'
import MockEnvironment from '../../Utils/MockEnvironment'
import MockOutput from '../../Utils/MockOutput'
import Interpreter from '../Interpreter'

describe('when given an expression statement', () => {
  test('calculates the expression', () => {
    const interpreter = new Interpreter(MockOutput, jest.fn(), MockEnvironment)
    expect(async () => await interpreter.visitExpressionStmt(new ExpressionStmt(new LiteralExpr(1)))).not.toThrow()
  })
})
