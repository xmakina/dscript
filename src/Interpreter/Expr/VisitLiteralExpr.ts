import { LiteralExpr } from '../../AST'
import { DScriptObject } from '../../Types'

export default async function visitLiteralExpr (expr: LiteralExpr): Promise<DScriptObject> {
  return expr.value
}
