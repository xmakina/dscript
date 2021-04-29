"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DScript_1 = __importDefault(require("../DScript"));
const MockOutput_1 = __importDefault(require("../Utils/MockOutput"));
const script = `
LET X = "bar"
INPUT X "What is X?"
PRINT X
`;
describe('with variable example script', () => {
    let expectedPrompt;
    beforeEach(async () => {
        jest.clearAllMocks();
        MockOutput_1.default.prompt = async (prompt) => {
            expectedPrompt = prompt;
            const promise = new Promise((resolve) => {
                setTimeout(() => resolve('flim'), 1000);
            });
            return promise;
        };
        const subject = new DScript_1.default(MockOutput_1.default, script);
        await subject.run();
    });
    test('no errors occur', () => {
        expect(MockOutput_1.default.error).not.toHaveBeenCalled();
    });
    test('the code prints the correct values', () => {
        expect(expectedPrompt).toEqual('What is X?');
        expect(MockOutput_1.default.print).toHaveBeenCalledWith('flim');
    });
});
