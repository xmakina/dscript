"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("../Types");
const Statement_1 = __importDefault(require("./Stmt/Statement"));
class Parser {
    constructor(report, tokens) {
        this.current = 0;
        this.peek = () => this.tokens[this.current];
        this.previous = () => this.tokens[this.current - 1];
        this.isAtEnd = () => this.peek().type === Types_1.TokenType.EOF;
        this.check = (type) => this.isAtEnd() ? false : this.peek().type === type;
        this.consume = (type, message) => {
            if (this.check(type)) {
                return this.advance();
            }
            throw new Types_1.ParseError(this.peek(), message);
        };
        this.advance = () => {
            if (!this.isAtEnd()) {
                this.current++;
            }
            return this.previous();
        };
        this.report = report;
        this.tokens = tokens;
    }
    parse() {
        const statements = [];
        while (!this.isAtEnd()) {
            try {
                if (this.match(Types_1.TokenType.NEWLINE)) {
                    // swallow the newline
                }
                else {
                    statements.push(Statement_1.default(this));
                }
            }
            catch (error) {
                if (error instanceof Types_1.ParseError) {
                    this.report(error);
                    this.synchronize();
                }
                else {
                    throw error;
                }
            }
        }
        return statements;
    }
    match(...types) {
        for (const type of types) {
            if (this.check(type)) {
                this.advance();
                return true;
            }
        }
        return false;
    }
    synchronize() {
        this.advance();
        while (!this.isAtEnd()) {
            if (this.previous().type === Types_1.TokenType.NEWLINE) {
                return;
            }
            switch (this.peek().type) {
                case Types_1.TokenType.PRINT:
                case Types_1.TokenType.LET:
                case Types_1.TokenType.SET:
                case Types_1.TokenType.IF:
                case Types_1.TokenType.THEN:
                case Types_1.TokenType.ELSE:
                    return;
            }
            this.advance();
        }
    }
}
exports.default = Parser;
