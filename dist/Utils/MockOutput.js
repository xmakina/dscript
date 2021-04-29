"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MockOutput = {
    print: jest.fn(),
    append: jest.fn(),
    error: jest.fn(),
    replace: jest.fn(),
    prompt: jest.fn().mockRejectedValue(new Error('No Promise Setup'))
};
exports.default = MockOutput;
