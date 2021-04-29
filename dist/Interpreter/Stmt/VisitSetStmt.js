"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (interpreter) => async (stmt) => {
    const value = await interpreter.evaluate(stmt.value);
    interpreter.environment.assign(stmt.name, value);
};
