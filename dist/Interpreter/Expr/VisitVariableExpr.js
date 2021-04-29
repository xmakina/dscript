"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (interpreter) => async (expr) => interpreter.lookUpVariable(expr.name, expr);
