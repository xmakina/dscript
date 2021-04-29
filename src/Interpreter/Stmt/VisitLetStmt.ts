import { IInterpreter } from '../Interpreter'
import { LetStmt } from '../../AST'

export default (interpreter: IInterpreter) => async (stmt: LetStmt): Promise<void> => {
  const value = await interpreter.evaluate(stmt.initializer)
  interpreter.environment.define(stmt.name.lexeme, value)
}
