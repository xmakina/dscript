"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DScriptFunction = void 0;
const Environment_1 = __importDefault(require("../Environment"));
const DScriptCallable_1 = require("./DScriptCallable");
class DScriptFunction extends DScriptCallable_1.DScriptCallable {
    constructor(declaration, closure) {
        super();
        this.arity = () => this.declaration.params.length;
        this.toString = () => `<fn ${this.declaration.name.lexeme}>`;
        this.declaration = declaration;
        this.closure = closure;
    }
    async call(interpreter, args) {
        const environment = new Environment_1.default(this.closure);
        for (let i = 0; i < this.declaration.params.length; i++) {
            environment.define(this.declaration.params[i].lexeme, args[i]);
        }
        try {
            await interpreter.executeBlock(this.declaration.body, environment);
        }
        catch (error) {
            if (error instanceof DScriptFunction.Return) {
                return error.value;
            }
            throw error;
        }
        return null;
    }
}
exports.DScriptFunction = DScriptFunction;
DScriptFunction.Return = class Return extends Error {
    constructor(value) {
        super();
        this.value = value;
        Object.setPrototypeOf(this, DScriptFunction.Return.prototype);
    }
};
