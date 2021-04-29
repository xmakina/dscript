import { Token } from '../Scanner/Token'
import { DScriptObject, RuntimeError } from '../Types'

export interface IEnvironment {
  assignAt: (distance: number, name: Token, value: DScriptObject) => void
  assign: (name: Token, value: DScriptObject) => void
  getAt: (distance: number, name: Token) => DScriptObject
  get: (name: Token) => DScriptObject
  define: ((name: string, value: DScriptObject) => void) & ((name: Token, value: DScriptObject) => void)
}

export default class Environment implements IEnvironment {
  private readonly values: Record<string, DScriptObject> = {}
  private readonly enclosing: IEnvironment | null

  constructor (enclosing: IEnvironment | null = null) {
    this.enclosing = enclosing
  }

  private ancestor (distance: number): IEnvironment {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let result: Environment | null = this
    for (let i = 0; i < distance; i++) {
      result = result?.enclosing as Environment ?? null
    }

    return result
  }

  define (name: string, value: DScriptObject): void
  define (name: Token, value: DScriptObject): void
  define (target: string | Token, value: DScriptObject): void {
    let name: string
    if (target instanceof Token) {
      name = target.lexeme
    } else {
      name = target
    }

    this.values[name] = value
  }

  getAt (distance: number, name: Token): DScriptObject {
    try {
      const result = this.ancestor(distance).get(name)
      return result
    } catch (error) {
      if (error instanceof RuntimeError) {
        // do nothing
      } else {
        throw error
      }
    }

    try {
      return this.get(name)
    } catch (error) {
      if (error instanceof RuntimeError) {
        throw new RuntimeError(name, `Cannot get at undefined variable '${name.lexeme}'.`)
      }

      throw error
    }
  }

  get (name: Token): DScriptObject {
    const value = this.values[name.lexeme]

    if (value === undefined) {
      if (this.enclosing !== null) return this.enclosing.get(name)
      throw new RuntimeError(name, `Cannot get undefined variable '${name.lexeme}'.`)
    }

    return value
  }

  assignAt (distance: number, name: Token, value: DScriptObject): void {
    this.ancestor(distance).assign(name, value)
  }

  assign (name: Token, value: DScriptObject): void {
    if (name.lexeme in this.values) {
      this.values[name.lexeme] = value
    } else if (this.enclosing !== null) {
      this.enclosing.assign(name, value)
    } else {
      throw new RuntimeError(name, `Cannot set undefined variable '${name.lexeme}'.`)
    }
  }
}
