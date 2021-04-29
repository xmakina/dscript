"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DScript_1 = __importDefault(require("../DScript"));
const MockOutput_1 = __importDefault(require("../Utils/MockOutput"));
const script = `
LET X = 1
PRINT X
SET X = 2
PRINT X
SET X = X + 2
PRINT X
`;
describe('with variable example script', () => {
    beforeEach(async () => {
        jest.clearAllMocks();
        const subject = new DScript_1.default(MockOutput_1.default, script);
        await subject.run();
    });
    test('no errors occur', () => {
        expect(MockOutput_1.default.error).not.toHaveBeenCalled();
    });
    test('the code prints the correct values', () => {
        expect(MockOutput_1.default.print).toHaveBeenNthCalledWith(1, '1');
        expect(MockOutput_1.default.print).toHaveBeenNthCalledWith(2, '2');
        expect(MockOutput_1.default.print).toHaveBeenNthCalledWith(3, '4');
    });
});
