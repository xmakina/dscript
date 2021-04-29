import { LiteralExpr } from '../../AST'

export default () => (expr: LiteralExpr): string => {
  return JSON.stringify(expr.value)
}
