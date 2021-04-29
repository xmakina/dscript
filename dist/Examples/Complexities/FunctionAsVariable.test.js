"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DScript_1 = __importDefault(require("../../DScript"));
const MockOutput_1 = __importDefault(require("../../Utils/MockOutput"));
describe('with a counter script', () => {
    const script = `
DEF makeCounter()
  LET i = 0
  DEF count()
    SET i = i + 1
    PRINT i
  DEND

  return count
DEND

LET counter = makeCounter()
counter()
counter()
    `;
    test('the output prints correctly', async () => {
        const subject = new DScript_1.default(MockOutput_1.default, script);
        await subject.run();
        expect(MockOutput_1.default.error).not.toBeCalled();
        expect(MockOutput_1.default.print).nthCalledWith(1, '1');
        expect(MockOutput_1.default.print).nthCalledWith(2, '2');
    });
});
