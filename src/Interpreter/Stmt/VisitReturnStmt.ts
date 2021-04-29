import { IInterpreter } from '../Interpreter'
import { ReturnStmt } from '../../AST'
import { DScriptFunction, DScriptObject } from '../../Types'

export default (interpreter: IInterpreter) => async (stmt: ReturnStmt): Promise<void> => {
  let value: DScriptObject = null
  if (stmt.value !== null) {
    value = await interpreter.evaluate(stmt.value)
  }

  throw new DScriptFunction.Return(value)
}
