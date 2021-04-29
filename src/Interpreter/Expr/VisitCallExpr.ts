import { IInterpreter } from '../Interpreter'
import { CallExpr } from '../../AST'
import { DScriptObject, DScriptCallable, RuntimeError } from '../../Types'
import { Stringify } from '../Utils'

export default (interpreter: IInterpreter) => async (expr: CallExpr): Promise<DScriptObject> => {
  const callee = await interpreter.evaluate(expr.callee)

  if (!(callee instanceof DScriptCallable)) {
    throw new RuntimeError(expr.paren, `Can only call functions, got ${Stringify(callee)}`)
  }

  const args: DScriptObject[] = []
  for (const arg of expr.args) {
    const value = await arg.accept(interpreter)
    args.push(value)
  }

  if (args.length !== callee.arity()) {
    throw new RuntimeError(expr.paren, `Expected ${callee.arity()} arguments but got ${args.length}.`)
  }

  return await callee.call(interpreter, args)
}
