import { FunctionStmt } from '../AST'
import Environment, { IEnvironment } from '../Environment'
import { IInterpreter } from '../Interpreter'
import { DScriptCallable } from './DScriptCallable'
import { DScriptObject } from './DScriptObject'

export class DScriptFunction extends DScriptCallable {
  static Return = class Return extends Error {
    value: DScriptObject

    constructor (value: DScriptObject) {
      super()
      this.value = value
      Object.setPrototypeOf(this, DScriptFunction.Return.prototype)
    }
  }

  private readonly declaration: FunctionStmt
  private readonly closure: IEnvironment

  constructor (declaration: FunctionStmt, closure: IEnvironment) {
    super()
    this.declaration = declaration
    this.closure = closure
  }

  async call (interpreter: IInterpreter, args: DScriptObject[]): Promise<DScriptObject> {
    const environment = new Environment(this.closure)
    for (let i = 0; i < this.declaration.params.length; i++) {
      environment.define(this.declaration.params[i].lexeme, args[i])
    }

    try {
      await interpreter.executeBlock(this.declaration.body, environment)
    } catch (error) {
      if (error instanceof DScriptFunction.Return) {
        return error.value
      }

      throw error
    }

    return null
  }

  arity = (): number => this.declaration.params.length

  toString = (): string => `<fn ${this.declaration.name.lexeme}>`
}
