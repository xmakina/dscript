"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("../../Types");
exports.default = (interpreter) => async (stmt) => {
    const array = interpreter.lookUpVariable(stmt.name, stmt.value);
    if (!Array.isArray(array)) {
        throw new Types_1.RuntimeError(stmt.name, 'Variable is not an array.');
    }
    const index = await interpreter.evaluate(stmt.index);
    if (typeof index !== 'number') {
        throw new Types_1.RuntimeError(stmt.name, 'Index is not a number.');
    }
    const value = await interpreter.evaluate(stmt.value);
    array[index] = value;
    interpreter.environment.assign(stmt.name, array);
};
