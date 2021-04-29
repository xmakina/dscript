import { DScriptCallable, DScriptObject } from '../../Types'

export default class ClockFunction extends DScriptCallable {
  arity= (): number => 0
  toString = (): string => "<native fun 'clock'>"
  call = async (): Promise<DScriptObject> => Date.now().valueOf() / 1000.0
}
