"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DScript_1 = __importDefault(require("../DScript"));
const MockOutput_1 = __importDefault(require("../Utils/MockOutput"));
const arrayScript = `
DIM col
FOR X = 0 TO 3
DIM row
FOR Y = 0 TO 3
SET row[Y] = (X + 1) * (Y + 1)
NEXT Y
SET col[X] = row
NEXT X

FOR X = 0 TO 3
FOR Y = 0 TO 3
LET row = col[X]
PRINT row[Y]
NEXT Y
NEXT X
`;
describe('with a single dimension array', () => {
    beforeEach(async () => {
        jest.clearAllMocks();
        const runner = new DScript_1.default(MockOutput_1.default, arrayScript);
        await runner.run();
    });
    test('the code prints the correct values', () => {
        expect(MockOutput_1.default.error).not.toHaveBeenCalled();
        expect(MockOutput_1.default.print).toHaveBeenNthCalledWith(1, '1');
        expect(MockOutput_1.default.print).toHaveBeenNthCalledWith(2, '2');
        expect(MockOutput_1.default.print).toHaveBeenNthCalledWith(3, '3');
        expect(MockOutput_1.default.print).toHaveBeenNthCalledWith(4, '2');
        expect(MockOutput_1.default.print).toHaveBeenNthCalledWith(5, '4');
        expect(MockOutput_1.default.print).toHaveBeenNthCalledWith(6, '6');
        expect(MockOutput_1.default.print).toHaveBeenNthCalledWith(7, '3');
        expect(MockOutput_1.default.print).toHaveBeenNthCalledWith(8, '6');
        expect(MockOutput_1.default.print).toHaveBeenNthCalledWith(9, '9');
    });
});
