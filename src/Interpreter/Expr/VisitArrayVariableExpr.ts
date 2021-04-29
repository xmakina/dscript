import { IInterpreter } from '../Interpreter'
import { ArrayVariableExpr } from '../../AST'
import { DScriptObject, RuntimeError } from '../../Types'
import { Stringify } from '../Utils'

export default (interpreter: IInterpreter) => async (expr: ArrayVariableExpr): Promise<DScriptObject> => {
  const variable = interpreter.lookUpVariable(expr.name, expr)
  if (!Array.isArray(variable)) {
    throw new RuntimeError(expr.name, `'${expr.name.lexeme}' is not an array, it is '${typeof variable}'`)
  }

  const index = await expr.index.accept(interpreter)
  if (typeof index === 'number') {
    return variable[index]
  }

  throw new RuntimeError(expr.name, `Index is not a number, found type '${typeof index}' with value '${Stringify(index)}'`)
}
