import { IInterpreter } from '../Interpreter'
import { WhileStmt } from '../../AST'
import { isTruthy } from '../Utils'

export default (interpreter: IInterpreter) => async (stmt: WhileStmt): Promise<void> => {
  while (isTruthy(await interpreter.evaluate(stmt.condition))) {
    await interpreter.execute(stmt.body)
  }
}
