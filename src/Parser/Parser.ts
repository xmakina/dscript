import { Stmt } from '../AST/Stmt'
import { Token } from '../Scanner/Token'
import { DScriptError, ParseError, TokenType } from '../Types'
import Statement from './Stmt/Statement'

export default class Parser {
  private readonly report: (error: DScriptError) => void
  private readonly tokens: Token[]
  private current = 0

  constructor (report: (error: DScriptError) => void, tokens: Token[]) {
    this.report = report
    this.tokens = tokens
  }

  parse (): Stmt[] {
    const statements: Stmt[] = []

    while (!this.isAtEnd()) {
      try {
        if (this.match(TokenType.NEWLINE)) {
        // swallow the newline
        } else {
          statements.push(Statement(this))
        }
      } catch (error) {
        if (error instanceof ParseError) {
          this.report(error)
          this.synchronize()
        } else {
          throw error
        }
      }
    }

    return statements
  }

  readonly peek = (): Token => this.tokens[this.current]
  readonly previous = (): Token => this.tokens[this.current - 1]
  readonly isAtEnd = (): boolean => this.peek().type === TokenType.EOF
  readonly check = (type: TokenType): boolean => this.isAtEnd() ? false : this.peek().type === type

  readonly consume = (type: TokenType, message: string): Token => {
    if (this.check(type)) {
      return this.advance()
    }

    throw new ParseError(this.peek(), message)
  }

  match (...types: TokenType[]): boolean {
    for (const type of types) {
      if (this.check(type)) {
        this.advance()
        return true
      }
    }

    return false
  }

  private synchronize (): void {
    this.advance()

    while (!this.isAtEnd()) {
      if (this.previous().type === TokenType.NEWLINE) {
        return
      }

      switch (this.peek().type) {
        case TokenType.PRINT:
        case TokenType.LET:
        case TokenType.SET:
        case TokenType.IF:
        case TokenType.THEN:
        case TokenType.ELSE:
          return
      }

      this.advance()
    }
  }

  private readonly advance = (): Token => {
    if (!this.isAtEnd()) {
      this.current++
    }

    return this.previous()
  }
}
