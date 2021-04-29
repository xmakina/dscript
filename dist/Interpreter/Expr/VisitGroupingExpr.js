"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (interpreter) => async (expr) => await interpreter.evaluate(expr.expression);
