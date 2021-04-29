import { Stringify } from '../Interpreter/Utils'
import { TokenType, DScriptObject } from '../Types'

export class Token {
  readonly type: TokenType
  readonly lexeme: string
  readonly literal: DScriptObject
  readonly line: number

  constructor (type: TokenType, lexeme: string, literal: DScriptObject, line: number) {
    this.type = type
    this.lexeme = lexeme
    this.literal = literal
    this.line = line
  }

  toString = (): string => `${this.type} ${this.lexeme} ${Stringify(this.literal)}`
}
