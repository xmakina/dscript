import { IInterpreter } from '../Interpreter'
import { ReplaceStmt } from '../../AST'
import { Stringify } from '../Utils'

export default (interpreter: IInterpreter) => async (stmt: ReplaceStmt): Promise<void> => {
  const value = await interpreter.evaluate(stmt.expression)
  interpreter.output.replace(Stringify(value))
}
