import { FunctionStmt } from '../../AST'
import { DScriptFunction } from '../../Types'
import Interpreter from '../Interpreter'

export default (interpreter: Interpreter) => async (stmt: FunctionStmt): Promise<void> => {
  const func = new DScriptFunction(stmt, interpreter.environment)
  interpreter.environment.define(stmt.name.lexeme, func)
}
