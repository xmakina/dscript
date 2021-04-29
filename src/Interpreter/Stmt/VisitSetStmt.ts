import { IInterpreter } from '../Interpreter'
import { SetStmt } from '../../AST'

export default (interpreter: IInterpreter) => async (stmt: SetStmt): Promise<void> => {
  const value = await interpreter.evaluate(stmt.value)
  interpreter.environment.assign(stmt.name, value)
}
