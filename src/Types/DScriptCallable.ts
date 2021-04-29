import { IInterpreter } from '../Interpreter'
import { DScriptObject } from './DScriptObject'

export abstract class DScriptCallable {
  abstract call (interpreter: IInterpreter, args: DScriptObject[]): Promise<DScriptObject>
  abstract arity (): number
  abstract toString (): string
}
