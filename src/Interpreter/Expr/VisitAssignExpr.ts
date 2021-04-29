import { AssignExpr } from '../../AST'
import { DScriptObject } from '../../Types'
import Interpreter from '../Interpreter'

export default (interpreter: Interpreter) => async (expr: AssignExpr): Promise<DScriptObject> => {
  const value = await interpreter.evaluate(expr.value)

  const distance = interpreter.locals.get(expr)
  if (distance !== undefined) {
    interpreter.environment.assignAt(distance, expr.name, value)
  } else {
    interpreter.globals.assign(expr.name, value)
  }

  return value
}
