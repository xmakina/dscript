"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DScript_1 = __importDefault(require("../DScript"));
const MockOutput_1 = __importDefault(require("../Utils/MockOutput"));
const script = `
LET foo = "bar"
LET wibble = 3
LET corge = 4

IF foo = "bar" THEN PRINT "foo is bar"

IF foo = "bar" AND wibble = 3 THEN PRINT "foo is bar and wibble is 3"
IF foo = "bar" OR wibble = corge THEN PRINT "either foo is bar or wibble is corge"

IF foo <> "qux" THEN PRINT "foo is not qux"

IF wibble < corge THEN PRINT "wibble is less than corge"
IF corge > wibble THEN PRINT "corge is greater than wibble"

IF corge = wibble THEN PRINT "corge is wibble"

IF foo = "bar" AND wibble = 3 AND corge = 4 THEN PRINT "foo is bar and wibble is 3 and corge is 4"
`;
describe('with an IF statement', () => {
    const subject = new DScript_1.default(MockOutput_1.default, script);
    test('the console is printed to', async () => {
        await subject.run();
        expect(MockOutput_1.default.print).toHaveBeenNthCalledWith(1, 'foo is bar');
        expect(MockOutput_1.default.print).toHaveBeenNthCalledWith(2, 'foo is bar and wibble is 3');
        expect(MockOutput_1.default.print).toHaveBeenNthCalledWith(3, 'either foo is bar or wibble is corge');
        expect(MockOutput_1.default.print).toHaveBeenNthCalledWith(4, 'foo is not qux');
        expect(MockOutput_1.default.print).toHaveBeenNthCalledWith(5, 'wibble is less than corge');
        expect(MockOutput_1.default.print).toHaveBeenNthCalledWith(6, 'corge is greater than wibble');
        expect(MockOutput_1.default.print).not.toHaveBeenCalledWith('corge is wibble');
        expect(MockOutput_1.default.print).toHaveBeenNthCalledWith(7, 'foo is bar and wibble is 3 and corge is 4');
    });
});
