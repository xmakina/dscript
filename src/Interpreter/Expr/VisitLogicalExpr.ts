import { IInterpreter } from '../Interpreter'
import { LogicalExpr } from '../../AST'
import { DScriptObject, TokenType } from '../../Types'
import { isTruthy } from '../Utils'

export default (interpreter: IInterpreter) => async (expr: LogicalExpr): Promise<DScriptObject> => {
  const left = await interpreter.evaluate(expr.left)

  if (expr.operator.type === TokenType.OR) {
    if (isTruthy(left)) return left
  } else {
    if (!isTruthy(left)) return left
  }

  return await interpreter.evaluate(expr.right)
}
