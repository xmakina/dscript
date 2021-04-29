"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jest_theories_1 = __importDefault(require("jest-theories"));
const MockInterpreter_1 = __importDefault(require("../../Utils/MockInterpreter"));
const IsNumberFunction_1 = __importDefault(require("./IsNumberFunction"));
describe('with is string function', () => {
    const subject = new IsNumberFunction_1.default();
    const theories = [
        { input: 'hello', expected: false },
        { input: 1, expected: true },
        { input: '1', expected: false }
    ];
    jest_theories_1.default('when given {input}, return {expected}', theories, async (theory) => {
        const result = await subject.call(MockInterpreter_1.default, [theory.input]);
        expect(result).toEqual(theory.expected);
    });
});
