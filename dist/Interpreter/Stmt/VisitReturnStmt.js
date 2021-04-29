"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("../../Types");
exports.default = (interpreter) => async (stmt) => {
    let value = null;
    if (stmt.value !== null) {
        value = await interpreter.evaluate(stmt.value);
    }
    throw new Types_1.DScriptFunction.Return(value);
};
