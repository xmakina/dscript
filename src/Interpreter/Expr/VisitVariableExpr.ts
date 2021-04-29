import { IInterpreter } from '../Interpreter'
import { VariableExpr } from '../../AST'
import { DScriptObject } from '../../Types'

export default (interpreter: IInterpreter) => async (expr: VariableExpr): Promise<DScriptObject> => interpreter.lookUpVariable(expr.name, expr)
