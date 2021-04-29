"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transpiler = void 0;
const VisitArrayAssignExpr_1 = __importDefault(require("./Expr/VisitArrayAssignExpr"));
const VisitLiteralExpr_1 = __importDefault(require("./Expr/VisitLiteralExpr"));
const VisitAppendStmt_1 = __importDefault(require("./Stmt/VisitAppendStmt"));
class Transpiler {
    constructor(output, report) {
        this.visitAppendStmt = VisitAppendStmt_1.default(this);
        this.visitArrayAssignExpr = VisitArrayAssignExpr_1.default(this);
        this.visitArrayVariableExpr = () => 'Not Implemented';
        this.visitAssignExpr = () => 'Not Implemented';
        this.visitBinaryExpr = () => 'Not Implemented';
        this.visitBlockStmt = () => 'Not Implemented';
        this.visitCallExpr = () => 'Not Implemented';
        this.visitDimStmt = () => 'Not Implemented';
        this.visitExpressionStmt = () => 'Not Implemented';
        this.visitFunctionStmt = () => 'Not Implemented';
        this.visitGroupingExpr = () => 'Not Implemented';
        this.visitIfStmt = () => 'Not Implemented';
        this.visitInputStmt = () => 'Not Implemented';
        this.visitLetStmt = () => 'Not Implemented';
        this.visitLiteralExpr = VisitLiteralExpr_1.default();
        this.visitLogicalExpr = () => 'Not Implemented';
        this.visitPrintStmt = () => 'Not Implemented';
        this.visitReplaceStmt = () => 'Not Implemented';
        this.visitReturnStmt = () => 'Not Implemented';
        this.visitSetArrayStmt = () => 'Not Implemented';
        this.visitSetStmt = () => 'Not Implemented';
        this.visitUnaryExpr = () => 'Not Implemented';
        this.visitVariableExpr = () => 'Not Implemented';
        this.visitWhileStmt = () => 'Not Implemented';
        this.output = output;
        this.report = report;
    }
    getVariableFor(name) {
        return name.lexeme;
    }
    transpile(target) {
        if (Array.isArray(target)) {
            const lines = [];
            for (const stmt of target) {
                lines.push(this.transpile(stmt));
            }
            return lines.join(';\n');
        }
        else {
            return target.accept(this);
        }
    }
}
exports.Transpiler = Transpiler;
