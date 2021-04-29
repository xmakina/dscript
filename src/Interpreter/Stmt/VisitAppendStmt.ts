import { IInterpreter } from '../Interpreter'
import { AppendStmt } from '../../AST'
import { Stringify } from '../Utils'

export default (interpreter: IInterpreter) => async (stmt: AppendStmt): Promise<void> => {
  const value = await interpreter.evaluate(stmt.expression)
  interpreter.output.append(Stringify(value))
}
