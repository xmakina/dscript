import { IInterpreter } from '../Interpreter'
import { SetArrayStmt } from '../../AST'
import { RuntimeError } from '../../Types'

export default (interpreter: IInterpreter) => async (stmt: SetArrayStmt): Promise<void> => {
  const array = interpreter.lookUpVariable(stmt.name, stmt.value)
  if (!Array.isArray(array)) {
    throw new RuntimeError(stmt.name, 'Variable is not an array.')
  }

  const index = await interpreter.evaluate(stmt.index)
  if (typeof index !== 'number') {
    throw new RuntimeError(stmt.name, 'Index is not a number.')
  }

  const value = await interpreter.evaluate(stmt.value)
  array[index] = value

  interpreter.environment.assign(stmt.name, array)
}
