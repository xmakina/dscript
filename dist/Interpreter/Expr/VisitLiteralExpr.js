"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function visitLiteralExpr(expr) {
    return expr.value;
}
exports.default = visitLiteralExpr;
