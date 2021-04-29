"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("../Types");
const MockToken_1 = __importDefault(require("../Utils/MockToken"));
const Environment_1 = __importDefault(require("./Environment"));
describe('with environment', () => {
    describe('when defining a variable', () => {
        test('the variable is set correctly', () => {
            const environment = new Environment_1.default();
            environment.define('foo', 'bar');
            const result = environment.get(MockToken_1.default(Types_1.TokenType.IDENTIFIER, '', 'foo'));
            expect(result).toEqual('bar');
        });
    });
    describe('when fetching a nested variable', () => {
        test('it returns the parent variable', () => {
            const environment = new Environment_1.default();
            environment.define('foo', 'bar');
            const childEnvironment = new Environment_1.default(environment);
            const result = childEnvironment.get(MockToken_1.default(Types_1.TokenType.IDENTIFIER, '', 'foo'));
            expect(result).toEqual('bar');
        });
    });
    describe('when setting a nested variable', () => {
        test('it sets the parent variable', () => {
            const environment = new Environment_1.default();
            environment.define('foo', '42');
            const childEnvironment = new Environment_1.default(environment);
            childEnvironment.assign(MockToken_1.default(Types_1.TokenType.IDENTIFIER, '', 'foo'), 'bar');
            const result = childEnvironment.get(MockToken_1.default(Types_1.TokenType.IDENTIFIER, '', 'foo'));
            expect(result).toEqual('bar');
        });
    });
    describe('when getting an undefined variable', () => {
        test('a runtime error occurs', () => {
            const environment = new Environment_1.default();
            expect(() => environment.get(MockToken_1.default(Types_1.TokenType.IDENTIFIER, '', 'foo'))).toThrow(Types_1.RuntimeError);
        });
    });
});
