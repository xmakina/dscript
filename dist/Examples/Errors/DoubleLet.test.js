"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DScript_1 = __importDefault(require("../../DScript"));
const MockOutput_1 = __importDefault(require("../../Utils/MockOutput"));
describe('with a bad function', () => {
    const source = `
    DEF bad()
      LET a = "first"
      LET a = "second"
    DEND
    `;
    test('the error is caught', async () => {
        const subject = new DScript_1.default(MockOutput_1.default, source);
        await subject.run();
        expect(MockOutput_1.default.error).nthCalledWith(1, '[ResolvingError (line 4, near a)] Already variable with this name in this scope.');
        expect(MockOutput_1.default.error).toHaveBeenCalledTimes(2);
    });
});
