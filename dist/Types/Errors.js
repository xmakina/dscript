"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolvingError = exports.RuntimeError = exports.ParseError = exports.SyntaxError = exports.TokenError = exports.DScriptError = void 0;
class DScriptError extends Error {
    constructor(line, message) {
        super(message);
        this.line = line;
        Object.setPrototypeOf(this, DScriptError.prototype);
    }
}
exports.DScriptError = DScriptError;
class TokenError extends DScriptError {
    constructor(token, message) {
        super(token.line, message);
        this.token = token;
        Object.setPrototypeOf(this, TokenError.prototype);
    }
}
exports.TokenError = TokenError;
class SyntaxError extends DScriptError {
    constructor(line, message) {
        super(line, message);
        Object.setPrototypeOf(this, SyntaxError.prototype);
    }
}
exports.SyntaxError = SyntaxError;
class ParseError extends TokenError {
    constructor(token, message) {
        super(token, message);
        Object.setPrototypeOf(this, ParseError.prototype);
    }
}
exports.ParseError = ParseError;
class RuntimeError extends TokenError {
    constructor(token, message) {
        super(token, message);
        Object.setPrototypeOf(this, RuntimeError.prototype);
    }
}
exports.RuntimeError = RuntimeError;
class ResolvingError extends TokenError {
    constructor(token, message) {
        super(token, message);
        Object.setPrototypeOf(this, ResolvingError.prototype);
    }
}
exports.ResolvingError = ResolvingError;
