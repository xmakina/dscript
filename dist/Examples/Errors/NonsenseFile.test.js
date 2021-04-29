"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DScript_1 = __importDefault(require("../../DScript"));
const MockOutput_1 = __importDefault(require("../../Utils/MockOutput"));
describe('with a nonsence file', () => {
    const subject = new DScript_1.default(MockOutput_1.default, 'wizzbang');
    test('the error is reported', async () => {
        await subject.run();
        expect(MockOutput_1.default.error).nthCalledWith(1, "[RuntimeError (line 1, near wizzbang)] Cannot get undefined variable 'wizzbang'.");
        expect(MockOutput_1.default.error).toHaveBeenCalledTimes(2);
    });
});
