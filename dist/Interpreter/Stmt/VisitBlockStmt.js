"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Environment_1 = __importDefault(require("../../Environment"));
exports.default = (interpreter) => async (stmt) => {
    await interpreter.executeBlock(stmt.statements, new Environment_1.default(interpreter.environment));
};
