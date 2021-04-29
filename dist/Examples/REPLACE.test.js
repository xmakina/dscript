"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DScript_1 = __importDefault(require("../DScript"));
const MockOutput_1 = __importDefault(require("../Utils/MockOutput"));
const script = `
PRINT "Hello world!"
REPLACE "Howdy friend!"
`;
describe('with an append script', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    const subject = new DScript_1.default(MockOutput_1.default, script);
    test('the console is printed to', async () => {
        await subject.run();
        expect(MockOutput_1.default.print).lastCalledWith('Hello world!');
        expect(MockOutput_1.default.replace).lastCalledWith('Howdy friend!');
    });
});
