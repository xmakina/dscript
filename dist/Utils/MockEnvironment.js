"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MockEnvironment = {
    get: jest.fn(),
    getAt: jest.fn(),
    assign: jest.fn(),
    assignAt: jest.fn(),
    define: jest.fn()
};
exports.default = MockEnvironment;
