"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("../../Types");
const Utils_1 = require("../Utils");
exports.default = (interpreter) => async (expr) => {
    const variable = interpreter.lookUpVariable(expr.name, expr);
    if (!Array.isArray(variable)) {
        throw new Types_1.RuntimeError(expr.name, `'${expr.name.lexeme}' is not an array, it is '${typeof variable}'`);
    }
    const index = await expr.index.accept(interpreter);
    if (typeof index === 'number') {
        return variable[index];
    }
    throw new Types_1.RuntimeError(expr.name, `Index is not a number, found type '${typeof index}' with value '${Utils_1.Stringify(index)}'`);
};
