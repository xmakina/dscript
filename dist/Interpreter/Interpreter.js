"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("../Types");
const VisitArrayVariableExpr_1 = __importDefault(require("./Expr/VisitArrayVariableExpr"));
const VisitBinaryExpr_1 = __importDefault(require("./Expr/VisitBinaryExpr"));
const VisitGroupingExpr_1 = __importDefault(require("./Expr/VisitGroupingExpr"));
const VisitLogicalExpr_1 = __importDefault(require("./Expr/VisitLogicalExpr"));
const VisitUnaryExpr_1 = __importDefault(require("./Expr/VisitUnaryExpr"));
const VisitVariableExpr_1 = __importDefault(require("./Expr/VisitVariableExpr"));
const ClockFunction_1 = __importDefault(require("./Func/ClockFunction"));
const VisitAppendStmt_1 = __importDefault(require("./Stmt/VisitAppendStmt"));
const VisitBlockStmt_1 = __importDefault(require("./Stmt/VisitBlockStmt"));
const VisitDimStmt_1 = __importDefault(require("./Stmt/VisitDimStmt"));
const VisitExpressionStmt_1 = __importDefault(require("./Stmt/VisitExpressionStmt"));
const VisitIfStmt_1 = __importDefault(require("./Stmt/VisitIfStmt"));
const VisitLetStmt_1 = __importDefault(require("./Stmt/VisitLetStmt"));
const VisitPrintStmt_1 = __importDefault(require("./Stmt/VisitPrintStmt"));
const VisitReplaceStmt_1 = __importDefault(require("./Stmt/VisitReplaceStmt"));
const VisitSetArrayStmt_1 = __importDefault(require("./Stmt/VisitSetArrayStmt"));
const VisitSetStmt_1 = __importDefault(require("./Stmt/VisitSetStmt"));
const VisitWhileStmt_1 = __importDefault(require("./Stmt/VisitWhileStmt"));
const VisitCallExpr_1 = __importDefault(require("./Expr/VisitCallExpr"));
const VisitInputStmt_1 = __importDefault(require("./Stmt/VisitInputStmt"));
const VisitLiteralExpr_1 = __importDefault(require("./Expr/VisitLiteralExpr"));
const VisitFunctionStmt_1 = __importDefault(require("./Stmt/VisitFunctionStmt"));
const VisitReturnStmt_1 = __importDefault(require("./Stmt/VisitReturnStmt"));
const VisitAssignExpr_1 = __importDefault(require("./Expr/VisitAssignExpr"));
const VisitArrayAssignExpr_1 = __importDefault(require("./Expr/VisitArrayAssignExpr"));
const IsNumberFunction_1 = __importDefault(require("./Func/IsNumberFunction"));
class Interpreter {
    constructor(output, report, globals) {
        this.locals = new Map();
        this.visitBinaryExpr = VisitBinaryExpr_1.default(this);
        this.visitGroupingExpr = VisitGroupingExpr_1.default(this);
        this.visitLiteralExpr = VisitLiteralExpr_1.default;
        this.visitUnaryExpr = VisitUnaryExpr_1.default(this);
        this.visitCallExpr = VisitCallExpr_1.default(this);
        this.visitLogicalExpr = VisitLogicalExpr_1.default(this);
        this.visitArrayVariableExpr = VisitArrayVariableExpr_1.default(this);
        this.visitVariableExpr = VisitVariableExpr_1.default(this);
        this.visitBlockStmt = VisitBlockStmt_1.default(this);
        this.visitExpressionStmt = VisitExpressionStmt_1.default(this);
        this.visitIfStmt = VisitIfStmt_1.default(this);
        this.visitInputStmt = VisitInputStmt_1.default(this);
        this.visitPrintStmt = VisitPrintStmt_1.default(this);
        this.visitAppendStmt = VisitAppendStmt_1.default(this);
        this.visitReplaceStmt = VisitReplaceStmt_1.default(this);
        this.visitDimStmt = VisitDimStmt_1.default(this);
        this.visitLetStmt = VisitLetStmt_1.default(this);
        this.visitSetStmt = VisitSetStmt_1.default(this);
        this.visitSetArrayStmt = VisitSetArrayStmt_1.default(this);
        this.visitWhileStmt = VisitWhileStmt_1.default(this);
        this.visitFunctionStmt = VisitFunctionStmt_1.default(this);
        this.visitReturnStmt = VisitReturnStmt_1.default(this);
        this.visitAssignExpr = VisitAssignExpr_1.default(this);
        this.visitArrayAssignExpr = VisitArrayAssignExpr_1.default(this);
        this.globals = globals;
        this.globals.define('CLOCK', new ClockFunction_1.default());
        this.globals.define('IS_NUMBER', new IsNumberFunction_1.default());
        this.output = output;
        this.report = report;
        this.environment = this.globals;
    }
    async interpret(statements) {
        try {
            for (const statement of statements) {
                await this.execute(statement);
            }
        }
        catch (error) {
            if (error instanceof Types_1.RuntimeError) {
                return this.report(error);
            }
            throw error;
        }
    }
    async evaluate(expr) {
        return await expr.accept(this);
    }
    async execute(stmt) {
        await stmt.accept(this);
    }
    async executeBlock(statements, environment) {
        const previous = this.environment;
        try {
            this.environment = environment;
            for (const statement of statements) {
                await this.execute(statement);
            }
        }
        finally {
            this.environment = previous;
        }
    }
    lookUpVariable(name, expr) {
        const distance = this.locals.get(expr);
        if (distance !== undefined) {
            return this.environment.getAt(distance, name);
        }
        else {
            return this.globals.get(name);
        }
    }
    resolve(expr, depth) {
        if (this.locals.has(expr)) {
            throw new Error('Expression already locally resolved');
        }
        this.locals.set(expr, depth);
    }
}
exports.default = Interpreter;
