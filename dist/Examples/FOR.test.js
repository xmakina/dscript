"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DScript_1 = __importDefault(require("../DScript"));
const MockOutput_1 = __importDefault(require("../Utils/MockOutput"));
describe('with a for loop', () => {
    let subject;
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('a standard for loop', () => {
        const source = `
    FOR X = 0 TO 4
      PRINT X
    NEXT X`;
        beforeEach(() => { subject = new DScript_1.default(MockOutput_1.default, source); });
        test('the loop counts from 0 to 3', async () => {
            await subject.run();
            expect(MockOutput_1.default.print).toHaveBeenNthCalledWith(1, '0');
            expect(MockOutput_1.default.print).toHaveBeenNthCalledWith(2, '1');
            expect(MockOutput_1.default.print).toHaveBeenNthCalledWith(3, '2');
            expect(MockOutput_1.default.print).toHaveBeenNthCalledWith(4, '3');
        });
    });
    describe('a loop which steps negatively', () => {
        const source = `
    FOR X = 4 TO 0 STEP -1
      PRINT X
    NEXT X`;
        beforeEach(() => { subject = new DScript_1.default(MockOutput_1.default, source); });
        test('the loop counts from 4 to 1', async () => {
            await subject.run();
            expect(MockOutput_1.default.print).toHaveBeenNthCalledWith(1, '4');
            expect(MockOutput_1.default.print).toHaveBeenNthCalledWith(2, '3');
            expect(MockOutput_1.default.print).toHaveBeenNthCalledWith(3, '2');
            expect(MockOutput_1.default.print).toHaveBeenNthCalledWith(4, '1');
        });
    });
    describe('a loop which gets the values from expressions', () => {
        const source = `
    DEF GetStep()
      RETURN 1
    DEND
    
    LET START = 0
    LET END = 4

    FOR X = START TO END STEP GetStep()
      PRINT X
    NEXT X`;
        beforeEach(() => { subject = new DScript_1.default(MockOutput_1.default, source); });
        test('the loop counts from 0 to 3', async () => {
            await subject.run();
            expect(MockOutput_1.default.print).toHaveBeenNthCalledWith(1, '0');
            expect(MockOutput_1.default.print).toHaveBeenNthCalledWith(2, '1');
            expect(MockOutput_1.default.print).toHaveBeenNthCalledWith(3, '2');
            expect(MockOutput_1.default.print).toHaveBeenNthCalledWith(4, '3');
        });
    });
});
