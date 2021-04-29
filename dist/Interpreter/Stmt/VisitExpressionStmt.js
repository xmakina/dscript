"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (interpreter) => async (stmt) => {
    await interpreter.evaluate(stmt.expression);
};
