"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DScript_1 = __importDefault(require("../DScript"));
const MockOutput_1 = __importDefault(require("../Utils/MockOutput"));
const script = `
LET target = "foobar"
DEF GREET(target)
  PRINT "Hello " + target + "!"
DEND

GREET("friends")
PRINT target

DEF SUM(a, b)
  RETURN a + b
DEND

PRINT SUM(2, 2)
`;
describe('with a user defined function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    const subject = new DScript_1.default(MockOutput_1.default, script);
    test('the console is printed to', async () => {
        await subject.run();
        expect(MockOutput_1.default.error).not.toHaveBeenCalled();
        expect(MockOutput_1.default.print).toHaveBeenNthCalledWith(1, 'Hello friends!');
        expect(MockOutput_1.default.print).toHaveBeenNthCalledWith(2, 'foobar');
        expect(MockOutput_1.default.print).toHaveBeenNthCalledWith(3, '4');
    });
});
