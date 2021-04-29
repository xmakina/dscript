"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("../Scanner/Token");
const Types_1 = require("../Types");
class Environment {
    constructor(enclosing = null) {
        this.values = {};
        this.enclosing = enclosing;
    }
    ancestor(distance) {
        var _a;
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let result = this;
        for (let i = 0; i < distance; i++) {
            result = (_a = result === null || result === void 0 ? void 0 : result.enclosing) !== null && _a !== void 0 ? _a : null;
        }
        return result;
    }
    define(target, value) {
        let name;
        if (target instanceof Token_1.Token) {
            name = target.lexeme;
        }
        else {
            name = target;
        }
        this.values[name] = value;
    }
    getAt(distance, name) {
        try {
            const result = this.ancestor(distance).get(name);
            return result;
        }
        catch (error) {
            if (error instanceof Types_1.RuntimeError) {
                // do nothing
            }
            else {
                throw error;
            }
        }
        try {
            return this.get(name);
        }
        catch (error) {
            if (error instanceof Types_1.RuntimeError) {
                throw new Types_1.RuntimeError(name, `Cannot get at undefined variable '${name.lexeme}'.`);
            }
            throw error;
        }
    }
    get(name) {
        const value = this.values[name.lexeme];
        if (value === undefined) {
            if (this.enclosing !== null)
                return this.enclosing.get(name);
            throw new Types_1.RuntimeError(name, `Cannot get undefined variable '${name.lexeme}'.`);
        }
        return value;
    }
    assignAt(distance, name, value) {
        this.ancestor(distance).assign(name, value);
    }
    assign(name, value) {
        if (name.lexeme in this.values) {
            this.values[name.lexeme] = value;
        }
        else if (this.enclosing !== null) {
            this.enclosing.assign(name, value);
        }
        else {
            throw new Types_1.RuntimeError(name, `Cannot set undefined variable '${name.lexeme}'.`);
        }
    }
}
exports.default = Environment;
