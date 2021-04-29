import { IInterpreter } from '../Interpreter'
import { BlockStmt } from '../../AST'
import Environment from '../../Environment'

export default (interpreter: IInterpreter) => async (stmt: BlockStmt): Promise<void> => {
  await interpreter.executeBlock(stmt.statements, new Environment(interpreter.environment))
}
