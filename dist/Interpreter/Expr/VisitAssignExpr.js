"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (interpreter) => async (expr) => {
    const value = await interpreter.evaluate(expr.value);
    const distance = interpreter.locals.get(expr);
    if (distance !== undefined) {
        interpreter.environment.assignAt(distance, expr.name, value);
    }
    else {
        interpreter.globals.assign(expr.name, value);
    }
    return value;
};
