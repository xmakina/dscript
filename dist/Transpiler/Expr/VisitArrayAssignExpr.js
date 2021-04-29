"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (transpiler) => (expr) => {
    const name = transpiler.getVariableFor(expr.name);
    const index = expr.index.accept(transpiler);
    const value = expr.value.accept(transpiler);
    return `${name}[${index}] = ${value}`;
};
