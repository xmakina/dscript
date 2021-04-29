"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("../../Types");
const Utils_1 = require("../Utils");
exports.default = (interpreter) => async (expr) => {
    const left = await interpreter.evaluate(expr.left);
    if (expr.operator.type === Types_1.TokenType.OR) {
        if (Utils_1.isTruthy(left))
            return left;
    }
    else {
        if (!Utils_1.isTruthy(left))
            return left;
    }
    return await interpreter.evaluate(expr.right);
};
