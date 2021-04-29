import { Token } from '../Scanner/Token'

export abstract class DScriptError extends Error {
  readonly line: number

  constructor (line: number, message?: string) {
    super(message)
    this.line = line
    Object.setPrototypeOf(this, DScriptError.prototype)
  }
}

export abstract class TokenError extends DScriptError {
  readonly token: Token

  constructor (token: Token, message?: string) {
    super(token.line, message)
    this.token = token
    Object.setPrototypeOf(this, TokenError.prototype)
  }
}

export class SyntaxError extends DScriptError {
  constructor (line: number, message?: string) {
    super(line, message)
    Object.setPrototypeOf(this, SyntaxError.prototype)
  }
}

export class ParseError extends TokenError {
  constructor (token: Token, message?: string) {
    super(token, message)
    Object.setPrototypeOf(this, ParseError.prototype)
  }
}

export class RuntimeError extends TokenError {
  constructor (token: Token, message?: string) {
    super(token, message)
    Object.setPrototypeOf(this, RuntimeError.prototype)
  }
}

export class ResolvingError extends TokenError {
  constructor (token: Token, message?: string) {
    super(token, message)
    Object.setPrototypeOf(this, ResolvingError.prototype)
  }
}
