import { IInterpreter } from '../Interpreter'
import { PrintStmt } from '../../AST'
import { Stringify } from '../Utils'

export default (interpreter: IInterpreter) => async (stmt: PrintStmt): Promise<void> => {
  const value = await interpreter.evaluate(stmt.expression)
  interpreter.output.print(Stringify(value))
}
