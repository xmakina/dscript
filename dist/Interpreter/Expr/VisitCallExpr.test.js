"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AST_1 = require("../../AST");
const Types_1 = require("../../Types");
const MockEnvironment_1 = __importDefault(require("../../Utils/MockEnvironment"));
const MockOutput_1 = __importDefault(require("../../Utils/MockOutput"));
const MockToken_1 = __importDefault(require("../../Utils/MockToken"));
const Interpreter_1 = __importDefault(require("../Interpreter"));
describe('with simple expressions', () => {
    let subject;
    class MockFunction extends Types_1.DScriptCallable {
        constructor() {
            super(...arguments);
            this.call = jest.fn();
            this.arity = () => 0;
            this.toString = () => '';
        }
    }
    const mockFunction = new MockFunction();
    beforeEach(() => {
        jest.clearAllMocks();
        subject = new Interpreter_1.default(MockOutput_1.default, jest.fn(), MockEnvironment_1.default);
        MockEnvironment_1.default.get = () => mockFunction;
        subject.environment = MockEnvironment_1.default;
    });
    test('when given a function expression', async () => {
        const expr = new AST_1.CallExpr(new AST_1.VariableExpr(MockToken_1.default(Types_1.TokenType.IDENTIFIER, 'foo')), MockToken_1.default(Types_1.TokenType.IDENTIFIER, 'foo'), []);
        await expr.accept(subject);
        expect(mockFunction.call).toBeCalled();
    });
});
