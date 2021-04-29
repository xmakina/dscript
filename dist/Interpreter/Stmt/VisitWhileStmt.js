"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = require("../Utils");
exports.default = (interpreter) => async (stmt) => {
    while (Utils_1.isTruthy(await interpreter.evaluate(stmt.condition))) {
        await interpreter.execute(stmt.body);
    }
};
