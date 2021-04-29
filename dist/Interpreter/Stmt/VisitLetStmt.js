"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (interpreter) => async (stmt) => {
    const value = await interpreter.evaluate(stmt.initializer);
    interpreter.environment.define(stmt.name.lexeme, value);
};
