"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scopes = void 0;
class Scopes {
    constructor() {
        this.scopes = [];
    }
    getDistance(lexeme) {
        for (let i = this.scopes.length - 1; i >= 0; i--) {
            if (this.scopes[i].includes(lexeme)) {
                return this.scopes.length - 1 - i;
            }
        }
        return null;
    }
    peek() {
        return this.scopes[this.scopes.length - 1];
    }
    isEmpty() {
        return this.scopes.length < 1;
    }
    beginScope() {
        this.scopes.push([]);
    }
    endScope() {
        this.scopes.pop();
    }
}
exports.Scopes = Scopes;
