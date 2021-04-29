import { IInterpreter } from '../Interpreter'
import { UnaryExpr } from '../../AST'
import { DScriptObject, TokenType } from '../../Types'
import { isTruthy } from '../Utils'

export default (interpreter: IInterpreter) => async (expr: UnaryExpr): Promise<DScriptObject> => {
  const right = await interpreter.evaluate(expr.right)

  switch (expr.operator.type) {
    case TokenType.BANG:
      return !isTruthy(right)
    case TokenType.MINUS:
      return -(right as number)
  }

  return null
}
