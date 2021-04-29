"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("../../Types");
exports.default = (interpreter) => async (stmt) => {
    const func = new Types_1.DScriptFunction(stmt, interpreter.environment);
    interpreter.environment.define(stmt.name.lexeme, func);
};
