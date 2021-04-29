import { AppendStmt } from '../../AST'
import { ITranspiler } from '../Transpiler'

export default (transpiler: ITranspiler) => (stmt: AppendStmt): string => {
  return `output.append(${stmt.expression.accept(transpiler)});`
}
