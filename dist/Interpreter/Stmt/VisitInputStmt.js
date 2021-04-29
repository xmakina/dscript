"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (interpreter) => async (stmt) => {
    var _a, _b;
    const name = stmt.name;
    const prompt = (_b = (_a = (await interpreter.evaluate(stmt.prompt))) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '';
    let value = await interpreter.output.prompt(prompt);
    if (!isNaN(Number.parseFloat(value))) {
        value = Number.parseFloat(value);
    }
    interpreter.environment.define(name.lexeme, value);
};
