import { DScriptCallable, DScriptObject } from '../../Types'
import { IInterpreter } from '../Interpreter'

export default class IsNumberFunction extends DScriptCallable {
  arity= (): number => 1
  toString = (): string => "<native fun 'is_number'>"
  call = async (_interpreter: IInterpreter, args: DScriptObject[]): Promise<DScriptObject> => typeof args[0] === 'number'
}
