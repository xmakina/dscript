import { ArrayAssignExpr } from '../../AST'
import { ITranspiler } from '../Transpiler'

export default (transpiler: ITranspiler) => (expr: ArrayAssignExpr): string => {
  const name: string = transpiler.getVariableFor(expr.name)
  const index = expr.index.accept(transpiler)
  const value = expr.value.accept(transpiler)

  return `${name}[${index}] = ${value}`
}
