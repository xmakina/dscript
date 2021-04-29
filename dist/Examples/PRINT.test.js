"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DScript_1 = __importDefault(require("../DScript"));
const MockOutput_1 = __importDefault(require("../Utils/MockOutput"));
const script = `
PRINT "Hello world!"

LET GREETING = "Hello"
LET AMOUNT = 2
LET TARGET = "worlds!"
PRINT GREETING + "! I see there are " + AMOUNT + " " + TARGET
`;
describe('with a print script', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    const subject = new DScript_1.default(MockOutput_1.default, script);
    test('the console is printed to', async () => {
        await subject.run();
        expect(MockOutput_1.default.print).toHaveBeenNthCalledWith(1, 'Hello world!');
        expect(MockOutput_1.default.print).toHaveBeenNthCalledWith(2, 'Hello! I see there are 2 worlds!');
    });
});
