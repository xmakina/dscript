"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("../../Types");
const Utils_1 = require("../Utils");
exports.default = (interpreter) => async (expr) => {
    const right = await interpreter.evaluate(expr.right);
    switch (expr.operator.type) {
        case Types_1.TokenType.BANG:
            return !Utils_1.isTruthy(right);
        case Types_1.TokenType.MINUS:
            return -right;
    }
    return null;
};
