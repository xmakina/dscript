import { IInterpreter } from '../Interpreter'
import { DimStmt } from '../../AST'

export default (interpreter: IInterpreter) => async (stmt: DimStmt): Promise<void> => {
  interpreter.environment.define(stmt.name, [])
}
