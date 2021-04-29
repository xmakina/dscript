import { IInterpreter } from '../Interpreter'
import { ExpressionStmt } from '../../AST'

export default (interpreter: IInterpreter) => async (stmt: ExpressionStmt): Promise<void> => {
  await interpreter.evaluate(stmt.expression)
}
