"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (transpiler) => (stmt) => {
    return `output.append(${stmt.expression.accept(transpiler)});`;
};
