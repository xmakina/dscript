"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("../../Types");
function checkNumberOperands(token, left, right) {
    if (typeof left === 'number' && typeof right === 'number') {
        return;
    }
    throw new Types_1.RuntimeError(token, 'Both operands must be numbers');
}
const isEqual = (a, b) => (a === null && b === null) ? true
    : a === null ? false
        : a === b;
exports.default = (interpreter) => async (expr) => {
    var _a, _b;
    const left = await interpreter.evaluate(expr.left);
    const right = await interpreter.evaluate(expr.right);
    switch (expr.operator.type) {
        case Types_1.TokenType.MINUS:
            checkNumberOperands(expr.operator, left, right);
            return left - right;
        case Types_1.TokenType.SLASH:
            checkNumberOperands(expr.operator, left, right);
            if (right === 0) {
                throw new Types_1.RuntimeError(expr.operator, 'Attempted to divide by 0.');
            }
            return left / right;
        case Types_1.TokenType.STAR:
            checkNumberOperands(expr.operator, left, right);
            return left * right;
        case Types_1.TokenType.LESS:
            checkNumberOperands(expr.operator, left, right);
            return left < right;
        case Types_1.TokenType.LESS_EQUAL:
            checkNumberOperands(expr.operator, left, right);
            return left <= right;
        case Types_1.TokenType.GREATER:
            checkNumberOperands(expr.operator, left, right);
            return left > right;
        case Types_1.TokenType.GREATER_EQUAL:
            checkNumberOperands(expr.operator, left, right);
            return left >= right;
        case Types_1.TokenType.UNEQUAL:
            return !isEqual(left, right);
        case Types_1.TokenType.EQUAL:
            return isEqual(left, right);
        case Types_1.TokenType.PLUS:
            if (typeof left === 'string') {
                return left.concat((_a = right === null || right === void 0 ? void 0 : right.toString()) !== null && _a !== void 0 ? _a : '');
            }
            if (typeof right === 'string') {
                return ((_b = left === null || left === void 0 ? void 0 : left.toString()) !== null && _b !== void 0 ? _b : '').concat(right);
            }
            if (typeof left === 'number' && typeof right === 'number') {
                return left + right;
            }
            throw new Types_1.RuntimeError(expr.operator, 'Operands must be two numbers or two strings.');
    }
    return null;
};
