import { IInterpreter } from '../Interpreter'
import { GroupingExpr } from '../../AST'
import { DScriptObject } from '../../Types'

export default (interpreter: IInterpreter) => async (expr: GroupingExpr): Promise<DScriptObject> => await interpreter.evaluate(expr.expression)
