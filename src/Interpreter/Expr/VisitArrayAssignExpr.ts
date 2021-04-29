import { ArrayAssignExpr } from '../../AST'
import { DScriptObject, RuntimeError } from '../../Types'
import Interpreter from '../Interpreter'
import { Stringify } from '../Utils'

export default (interpreter: Interpreter) => async (expr: ArrayAssignExpr): Promise<DScriptObject> => {
  const value = await interpreter.evaluate(expr.value)
  const variable = interpreter.lookUpVariable(expr.name, expr)
  if (!Array.isArray(variable)) {
    throw new RuntimeError(expr.name, `'${expr.name.lexeme}' is not an array, it is '${typeof variable}'`)
  }

  const index = await expr.index.accept(interpreter)
  if (typeof index === 'number') {
    variable[index] = value
    return value
  }

  throw new RuntimeError(expr.name, `Index is not a number, found type '${typeof index}' with value '${Stringify(index)}'`)
}
