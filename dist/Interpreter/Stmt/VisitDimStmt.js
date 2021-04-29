"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (interpreter) => async (stmt) => {
    interpreter.environment.define(stmt.name, []);
};
