"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("../Types");
const Token_1 = require("./Token");
const isDigit = (c) => !isNaN(parseInt(c));
const isAlpha = (c) => (c.toUpperCase() !== c.toLowerCase()) || c === '_';
const isAlphaNumeric = (c) => isDigit(c) || isAlpha(c);
class Scanner {
    constructor(source) {
        this.tokens = [];
        this.current = 0;
        this.start = 0;
        this.line = 1;
        this.isAtEnd = () => this.current >= this.source.length;
        this.advance = () => this.source.charAt(this.current++);
        this.peek = () => this.isAtEnd() ? '\0' : this.source.charAt(this.current);
        this.peekNext = () => this.current + 1 >= this.source.length ? '\0' : this.source.charAt(this.current + 1);
        this.source = source;
    }
    ScanTokens() {
        while (!this.isAtEnd()) {
            // We are at the start of the next lexeme
            this.start = this.current;
            this.scanToken();
        }
        this.tokens.push(new Token_1.Token(Types_1.TokenType.NEWLINE, '', null, this.line));
        this.tokens.push(new Token_1.Token(Types_1.TokenType.EOF, '', null, this.line));
        return this.tokens;
    }
    scanToken() {
        const c = this.advance();
        switch (c) {
            case '(': return this.addToken(Types_1.TokenType.LEFT_PAREN);
            case ')': return this.addToken(Types_1.TokenType.RIGHT_PAREN);
            case '[': return this.addToken(Types_1.TokenType.LEFT_BRACE);
            case ']': return this.addToken(Types_1.TokenType.RIGHT_BRACE);
            case ',': return this.addToken(Types_1.TokenType.COMMA);
            case '.': return this.addToken(Types_1.TokenType.DOT);
            case ';': return this.addToken(Types_1.TokenType.SEMICOLON);
            case '\\': return this.addToken(Types_1.TokenType.BACKSLASH);
            case '-': return this.addToken(Types_1.TokenType.MINUS);
            case '+': return this.addToken(Types_1.TokenType.PLUS);
            case '*': return this.addToken(Types_1.TokenType.STAR);
            case '/': return this.addToken(Types_1.TokenType.SLASH);
            case '!': return this.addToken(Types_1.TokenType.BANG);
            case '=': return this.addToken(Types_1.TokenType.EQUAL);
            case '\n':
                this.line++;
                return this.addToken(Types_1.TokenType.NEWLINE);
            case '>':
                return this.addToken(this.match('=') ? Types_1.TokenType.GREATER_EQUAL : Types_1.TokenType.GREATER);
            case '<':
                return this.addToken(this.match('=') ? Types_1.TokenType.LESS_EQUAL
                    : this.match('>') ? Types_1.TokenType.UNEQUAL
                        : Types_1.TokenType.LESS);
            case '"':
                this.string();
                break;
            case ' ':
            case '\t':
            case '\r':
                break;
            default:
                if (isDigit(c)) {
                    this.number();
                }
                else if (isAlpha(c)) {
                    this.identifier();
                }
                else {
                    throw new Types_1.SyntaxError(this.line, `Unexpected character '${c}'.`);
                }
        }
    }
    addToken(type, literal = null) {
        const text = this.source.substring(this.start, this.current);
        this.tokens.push(new Token_1.Token(type, text, literal, this.line));
    }
    match(expected) {
        if (this.isAtEnd())
            return false;
        if (this.source.charAt(this.current) !== expected)
            return false;
        this.current++;
        return true;
    }
    string() {
        while (this.peek() !== '"' && !this.isAtEnd()) {
            if (this.peek() === '\n') {
                this.line++;
            }
            this.advance();
        }
        if (this.isAtEnd()) {
            throw new Types_1.SyntaxError(this.line, 'Unterminated string.');
        }
        this.advance();
        const value = this.source.substring(this.start + 1, this.current - 1);
        this.addToken(Types_1.TokenType.STRING, value);
    }
    number() {
        while (isDigit(this.peek()))
            this.advance();
        if (this.peek() === '.' && isDigit(this.peekNext())) {
            this.advance(); // Consume the dot character
            while (isDigit(this.peek()))
                this.advance();
        }
        const value = parseFloat(this.source.substring(this.start, this.current));
        this.addToken(Types_1.TokenType.NUMBER, value);
    }
    identifier() {
        var _a;
        while (isAlphaNumeric(this.peek())) {
            this.advance();
        }
        const text = this.source.substring(this.start, this.current).toLowerCase();
        const type = (_a = Types_1.keywords[text]) !== null && _a !== void 0 ? _a : Types_1.TokenType.IDENTIFIER;
        this.addToken(type);
    }
}
exports.default = Scanner;
