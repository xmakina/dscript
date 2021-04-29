"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jest_theories_1 = __importDefault(require("jest-theories"));
const Types_1 = require("../Types");
const Scanner_1 = __importDefault(require("./Scanner"));
describe('with scanner', () => {
    const theories = [
        { input: '\n', expected: Types_1.TokenType.NEWLINE },
        { input: '\\', expected: Types_1.TokenType.BACKSLASH },
        { input: '/', expected: Types_1.TokenType.SLASH },
        { input: '>', expected: Types_1.TokenType.GREATER },
        { input: '>=', expected: Types_1.TokenType.GREATER_EQUAL },
        { input: '<', expected: Types_1.TokenType.LESS },
        { input: '<=', expected: Types_1.TokenType.LESS_EQUAL },
        { input: '<>', expected: Types_1.TokenType.UNEQUAL },
        { input: '"Hello World"', expected: Types_1.TokenType.STRING },
        { input: 'Hello', expected: Types_1.TokenType.IDENTIFIER },
        { input: '_Hello', expected: Types_1.TokenType.IDENTIFIER },
        { input: 'PRINT', expected: Types_1.TokenType.PRINT },
        { input: 'print', expected: Types_1.TokenType.PRINT }
    ];
    jest_theories_1.default('the character {input} is correctly tokenised', theories, (theory) => {
        const tokens = (new Scanner_1.default(theory.input)).ScanTokens();
        expect(tokens[0].type).toEqual(theory.expected);
        expect(tokens.length).toEqual(3);
    });
    test('white space is ignored', () => {
        const tokens = (new Scanner_1.default(' ')).ScanTokens();
        expect(tokens[0].type).toEqual(Types_1.TokenType.NEWLINE);
        expect(tokens.length).toEqual(2);
    });
    describe('with numbers', () => {
        const theories = [
            { input: '1', expected: 1 },
            { input: '12', expected: 12 },
            { input: '123', expected: 123 },
            { input: '123.4', expected: 123.4 }
        ];
        jest_theories_1.default('the character {input} is correctly read as {expected}', theories, (theory) => {
            const tokens = (new Scanner_1.default(theory.input)).ScanTokens();
            expect(tokens[0].type).toEqual(Types_1.TokenType.NUMBER);
            expect(tokens[0].literal).toEqual(theory.expected);
            expect(tokens.length).toEqual(3);
        });
    });
});
