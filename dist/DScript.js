"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AstPrinter_1 = require("./AST/AstPrinter");
const Environment_1 = __importDefault(require("./Environment"));
const Interpreter_1 = __importDefault(require("./Interpreter/Interpreter"));
const Parser_1 = __importDefault(require("./Parser/Parser"));
const Resolver_1 = require("./Resolver/Resolver");
const Scanner_1 = __importDefault(require("./Scanner"));
const Types_1 = require("./Types");
class DScript {
    constructor(output, source, showPrinter = false) {
        DScript.output = output;
        this.source = source;
        this.showPrinter = showPrinter;
        if (DScript.output === undefined) {
            throw new Error('Console Must Be Defined.');
        }
    }
    async run() {
        const scanner = new Scanner_1.default(this.source);
        const tokens = scanner.ScanTokens();
        const parser = new Parser_1.default(this.report, tokens);
        const statements = parser.parse();
        if (DScript.hadError) {
            return 65;
        }
        const interpreter = new Interpreter_1.default(DScript.output, this.report, new Environment_1.default());
        if (this.showPrinter) {
            console.log(new AstPrinter_1.AstPrinter().stringify(statements));
        }
        const resolver = new Resolver_1.Resolver(interpreter, this.report);
        resolver.resolve(statements);
        if (DScript.hadError) {
            return 66;
        }
        await interpreter.interpret(statements);
        if (DScript.hadRuntimeError) {
            return 70;
        }
        return 0;
    }
    report(error) {
        if (error instanceof Types_1.RuntimeError) {
            DScript.hadRuntimeError = true;
        }
        else {
            DScript.hadError = true;
        }
        if (error instanceof Types_1.TokenError) {
            DScript.output.error(`[${error.constructor.name} (line ${error.line}, near ${error.token.lexeme})] ${error.message}`);
        }
        else {
            DScript.output.error(`[${error.constructor.name} (line ${error.line})] ${error.message}`);
        }
        if (error.stack !== undefined) {
            DScript.output.error(error.stack);
        }
    }
}
exports.default = DScript;
DScript.hadError = false;
DScript.hadRuntimeError = false;
