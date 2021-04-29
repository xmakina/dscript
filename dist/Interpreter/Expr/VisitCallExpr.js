"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("../../Types");
const Utils_1 = require("../Utils");
exports.default = (interpreter) => async (expr) => {
    const callee = await interpreter.evaluate(expr.callee);
    if (!(callee instanceof Types_1.DScriptCallable)) {
        throw new Types_1.RuntimeError(expr.paren, `Can only call functions, got ${Utils_1.Stringify(callee)}`);
    }
    const args = [];
    for (const arg of expr.args) {
        const value = await arg.accept(interpreter);
        args.push(value);
    }
    if (args.length !== callee.arity()) {
        throw new Types_1.RuntimeError(expr.paren, `Expected ${callee.arity()} arguments but got ${args.length}.`);
    }
    return await callee.call(interpreter, args);
};
