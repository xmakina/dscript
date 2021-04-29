import { DScriptObject, TokenType, SyntaxError, keywords } from '../Types'
import { Token } from './Token'

const isDigit = (c: string): boolean => !isNaN(parseInt(c))
const isAlpha = (c: string): boolean => (c.toUpperCase() !== c.toLowerCase()) || c === '_'
const isAlphaNumeric = (c: string): boolean => isDigit(c) || isAlpha(c)

export default class Scanner {
  private readonly source: string
  private readonly tokens: Token[] = []
  private current = 0
  private start = 0
  private line = 1

  constructor (source: string) {
    this.source = source
  }

  private readonly isAtEnd = (): boolean => this.current >= this.source.length
  private readonly advance = (): string => this.source.charAt(this.current++)
  private readonly peek = (): string => this.isAtEnd() ? '\0' : this.source.charAt(this.current)
  private readonly peekNext = (): string => this.current + 1 >= this.source.length ? '\0' : this.source.charAt(this.current + 1)

  ScanTokens (): Token[] {
    while (!this.isAtEnd()) {
      // We are at the start of the next lexeme
      this.start = this.current
      this.scanToken()
    }

    this.tokens.push(new Token(TokenType.NEWLINE, '', null, this.line))
    this.tokens.push(new Token(TokenType.EOF, '', null, this.line))
    return this.tokens
  }

  private scanToken (): void {
    const c = this.advance()
    switch (c) {
      case '(': return this.addToken(TokenType.LEFT_PAREN)
      case ')': return this.addToken(TokenType.RIGHT_PAREN)
      case '[': return this.addToken(TokenType.LEFT_BRACE)
      case ']': return this.addToken(TokenType.RIGHT_BRACE)
      case ',': return this.addToken(TokenType.COMMA)
      case '.': return this.addToken(TokenType.DOT)
      case ';': return this.addToken(TokenType.SEMICOLON)
      case '\\': return this.addToken(TokenType.BACKSLASH)
      case '-': return this.addToken(TokenType.MINUS)
      case '+': return this.addToken(TokenType.PLUS)
      case '*': return this.addToken(TokenType.STAR)
      case '/': return this.addToken(TokenType.SLASH)
      case '!': return this.addToken(TokenType.BANG)
      case '=': return this.addToken(TokenType.EQUAL)
      case '\n':
        this.line++
        return this.addToken(TokenType.NEWLINE)
      case '>':
        return this.addToken(this.match('=') ? TokenType.GREATER_EQUAL : TokenType.GREATER)
      case '<':
        return this.addToken(
          this.match('=') ? TokenType.LESS_EQUAL
            : this.match('>') ? TokenType.UNEQUAL
              : TokenType.LESS)
      case '"': this.string(); break
      case ' ':
      case '\t':
      case '\r':
        break
      default:
        if (isDigit(c)) {
          this.number()
        } else if (isAlpha(c)) {
          this.identifier()
        } else {
          throw new SyntaxError(this.line, `Unexpected character '${c}'.`)
        }
    }
  }

  private addToken (type: TokenType, literal: DScriptObject = null): void {
    const text = this.source.substring(this.start, this.current)
    this.tokens.push(new Token(type, text, literal, this.line))
  }

  private match (expected: string): boolean {
    if (this.isAtEnd()) return false
    if (this.source.charAt(this.current) !== expected) return false

    this.current++
    return true
  }

  private string (): void {
    while (this.peek() !== '"' && !this.isAtEnd()) {
      if (this.peek() === '\n') { this.line++ }
      this.advance()
    }

    if (this.isAtEnd()) {
      throw new SyntaxError(this.line, 'Unterminated string.')
    }

    this.advance()

    const value = this.source.substring(this.start + 1, this.current - 1)
    this.addToken(TokenType.STRING, value)
  }

  private number (): void {
    while (isDigit(this.peek())) this.advance()

    if (this.peek() === '.' && isDigit(this.peekNext())) {
      this.advance() // Consume the dot character
      while (isDigit(this.peek())) this.advance()
    }

    const value = parseFloat(this.source.substring(this.start, this.current))
    this.addToken(TokenType.NUMBER, value)
  }

  private identifier (): void {
    while (isAlphaNumeric(this.peek())) {
      this.advance()
    }

    const text = this.source.substring(this.start, this.current).toLowerCase()
    const type = keywords[text] ?? TokenType.IDENTIFIER
    this.addToken(type)
  }
}
