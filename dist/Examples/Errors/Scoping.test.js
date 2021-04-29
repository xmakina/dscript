"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DScript_1 = __importDefault(require("../../DScript"));
const MockOutput_1 = __importDefault(require("../../Utils/MockOutput"));
describe('with scoping script', () => {
    const script = `
LET a = "global"
DEF run()
  DEF showA()
    PRINT a
  DEND

  showA()
  LET a = "block"
  showA()
DEND

run()
    `;
    test('the output prints correctly', async () => {
        const subject = new DScript_1.default(MockOutput_1.default, script);
        await subject.run();
        expect(MockOutput_1.default.error).not.toBeCalled();
        expect(MockOutput_1.default.print).nthCalledWith(1, 'global');
        expect(MockOutput_1.default.print).nthCalledWith(2, 'global');
    });
});
