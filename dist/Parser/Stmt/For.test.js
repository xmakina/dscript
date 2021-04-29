"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AST_1 = require("../../AST");
const Scanner_1 = __importDefault(require("../../Scanner"));
const Types_1 = require("../../Types");
const Parser_1 = __importDefault(require("../Parser"));
describe('when parsing FOR statement', () => {
    describe('with any for statement', () => {
        const source = `FOR X = 1 TO 10
    NEXT X`;
        test('the operator is unequal and the default step is +1', () => {
            const tokens = new Scanner_1.default(source).ScanTokens();
            const parser = new Parser_1.default(jest.fn(), tokens);
            const parseResult = parser.parse();
            expect(parseResult[0]).toBeInstanceOf(AST_1.BlockStmt);
            const statements = parseResult[0].statements;
            expect(statements[1]).toBeInstanceOf(AST_1.WhileStmt);
            const whileStmt = statements[1];
            expect(whileStmt.condition).toBeInstanceOf(AST_1.BinaryExpr);
            const binaryExpr = whileStmt.condition;
            expect(binaryExpr.operator.type).toEqual(Types_1.TokenType.UNEQUAL);
            expect(whileStmt.body).toBeInstanceOf(AST_1.BlockStmt);
            const body = whileStmt.body;
            expect(body.statements[1]).toBeInstanceOf(AST_1.SetStmt);
            const setStmt = body.statements[1];
            expect(setStmt.value).toBeInstanceOf(AST_1.BinaryExpr);
            const increment = setStmt.value;
            expect(increment.operator.type).toEqual(Types_1.TokenType.PLUS);
        });
    });
});
