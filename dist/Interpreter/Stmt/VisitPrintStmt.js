"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = require("../Utils");
exports.default = (interpreter) => async (stmt) => {
    const value = await interpreter.evaluate(stmt.expression);
    interpreter.output.print(Utils_1.Stringify(value));
};
