import { IInterpreter } from '../Interpreter'
import { IfStmt } from '../../AST'
import { isTruthy } from '../Utils'

export default (interpreter: IInterpreter) => async (stmt: IfStmt): Promise<void> => {
  if (isTruthy(await interpreter.evaluate(stmt.condition))) {
    await interpreter.execute(stmt.thenBranch)
  } else if (stmt.elseBranch !== undefined) {
    await interpreter.execute(stmt.elseBranch)
  }
}
