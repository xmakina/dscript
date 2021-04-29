"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Parser_1 = __importDefault(require("../Parser"));
const Scanner_1 = __importDefault(require("../Scanner"));
const MockInterpreter_1 = __importDefault(require("../Utils/MockInterpreter"));
const Resolver_1 = require("./Resolver");
describe('with resolver', () => {
    const resolver = new Resolver_1.Resolver(MockInterpreter_1.default, jest.fn());
    describe('when resolving complex', () => {
        const source = `
        LET a = "global"
        DEF run()
          DEF showA()
            PRINT a
          DEND
        
          showA()
          LET a = "block"
          showA()
        DEND
        
        run()`;
        beforeEach(() => {
            const tokens = new Scanner_1.default(source).ScanTokens();
            const statements = new Parser_1.default(jest.fn(), tokens).parse();
            resolver.resolve(statements);
        });
        test('foo distance is set once', () => {
            expect(MockInterpreter_1.default.resolve).toBeCalledTimes(2);
            expect(MockInterpreter_1.default.resolve).toHaveBeenNthCalledWith(1, expect.objectContaining({
                name: expect.objectContaining({ lexeme: 'showA', line: 8 })
            }), 0);
            expect(MockInterpreter_1.default.resolve).toHaveBeenNthCalledWith(2, expect.objectContaining({
                name: expect.objectContaining({ lexeme: 'showA', line: 10 })
            }), 0);
        });
    });
});
