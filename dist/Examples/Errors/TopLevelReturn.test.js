"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DScript_1 = __importDefault(require("../../DScript"));
const MockOutput_1 = __importDefault(require("../../Utils/MockOutput"));
describe('with a top level return', () => {
    const subject = new DScript_1.default(MockOutput_1.default, 'RETURN "at top level"');
    test('the error is reported', async () => {
        await subject.run();
        expect(MockOutput_1.default.error).nthCalledWith(1, "[ResolvingError (line 1, near RETURN)] Can't return from top-level code.");
        expect(MockOutput_1.default.error).toHaveBeenCalledTimes(2);
    });
});
