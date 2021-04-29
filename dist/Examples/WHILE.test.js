"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DScript_1 = __importDefault(require("../DScript"));
const MockOutput_1 = __importDefault(require("../Utils/MockOutput"));
const script = `
LET X = 0
WHILE X < 3
    PRINT X
    SET X = X + 1
WEND
PRINT X
`;
describe('with a WHILE loop', () => {
    const subject = new DScript_1.default(MockOutput_1.default, script);
    test('the console is printed to', async () => {
        await subject.run();
        expect(MockOutput_1.default.print).toHaveBeenNthCalledWith(1, '0');
        expect(MockOutput_1.default.print).toHaveBeenNthCalledWith(2, '1');
        expect(MockOutput_1.default.print).toHaveBeenNthCalledWith(3, '2');
        expect(MockOutput_1.default.print).toHaveBeenNthCalledWith(4, '3');
    });
});
