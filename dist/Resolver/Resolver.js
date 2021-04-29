"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resolver = void 0;
const Types_1 = require("../Types");
const Scopes_1 = require("./Scopes");
class Resolver {
    constructor(interpreter, report) {
        this.scopes = new Scopes_1.Scopes();
        this.inFunction = false;
        this.resolveExpressionStmt = (stmt) => {
            this.resolve(stmt.expression);
        };
        this.visitExpressionStmt = this.resolveExpressionStmt;
        this.visitAppendStmt = this.resolveExpressionStmt;
        this.visitPrintStmt = (stmt) => {
            this.resolve(stmt.expression);
        };
        this.visitReplaceStmt = this.resolveExpressionStmt;
        this.visitAssignExpr = (expr) => {
            this.resolve(expr.value);
            this.resolveLocal(expr, expr.name);
        };
        this.visitArrayAssignExpr = (expr) => {
            this.resolve(expr.index);
            this.resolve(expr.value);
            this.resolveLocal(expr, expr.name);
        };
        this.visitBinaryExpr = (expr) => {
            this.resolve(expr.left);
            this.resolve(expr.right);
        };
        this.visitBlockStmt = (stmt) => {
            this.scopes.beginScope();
            this.resolve(stmt.statements);
            this.scopes.endScope();
        };
        this.visitCallExpr = (expr) => {
            this.resolve(expr.callee);
            for (const arg of expr.args) {
                this.resolve(arg);
            }
        };
        this.visitIfStmt = (stmt) => {
            this.resolve(stmt.condition);
            this.resolve(stmt.thenBranch);
            if (stmt.elseBranch !== undefined) {
                this.resolve(stmt.elseBranch);
            }
        };
        this.visitInputStmt = (stmt) => {
            this.resolve(stmt.prompt);
        };
        this.visitLetStmt = (stmt) => {
            this.declare(stmt.name);
            this.resolve(stmt.initializer);
        };
        this.visitDimStmt = (stmt) => {
            this.declare(stmt.name);
        };
        this.visitSetStmt = (stmt) => {
            this.resolve(stmt.value);
            this.resolveLocal(stmt.value, stmt.name);
        };
        this.visitSetArrayStmt = (stmt) => {
            this.resolve(stmt.index);
            this.resolve(stmt.value);
            this.resolveLocal(stmt.value, stmt.name);
        };
        this.visitLiteralExpr = () => {
            // do nothing
        };
        this.visitLogicalExpr = (expr) => {
            this.resolve(expr.left);
            this.resolve(expr.right);
        };
        this.visitUnaryExpr = (expr) => {
            this.resolve(expr.right);
        };
        this.visitWhileStmt = (stmt) => {
            this.resolve(stmt.condition);
            this.resolve(stmt.body);
        };
        this.interpreter = interpreter;
        this.report = report;
    }
    resolve(target) {
        if (Array.isArray(target)) {
            for (const stmt of target) {
                this.resolve(stmt);
            }
        }
        else {
            try {
                target.accept(this);
            }
            catch (error) {
                if (error instanceof Types_1.DScriptError) {
                    this.report(error);
                }
                else {
                    throw error;
                }
            }
        }
    }
    resolveLocal(expr, name) {
        const distance = this.scopes.getDistance(name.lexeme);
        if (distance !== null) {
            this.interpreter.resolve(expr, distance);
        }
    }
    declare(name) {
        if (this.scopes.isEmpty()) {
            return;
        }
        const scope = this.scopes.peek();
        if (scope.includes(name.lexeme)) {
            throw new Types_1.ResolvingError(name, 'Already variable with this name in this scope.');
        }
        scope.push(name.lexeme);
    }
    visitArrayVariableExpr(expr) {
        this.resolve(expr.index);
        this.resolveLocal(expr, expr.name);
    }
    visitVariableExpr(expr) {
        this.resolveLocal(expr, expr.name);
    }
    visitFunctionStmt(stmt) {
        const enclosingFunction = this.inFunction;
        this.inFunction = true;
        this.declare(stmt.name);
        this.scopes.beginScope();
        for (const param of stmt.params) {
            this.declare(param);
        }
        this.resolve(stmt.body);
        this.scopes.endScope();
        this.inFunction = enclosingFunction;
    }
    visitGroupingExpr(expr) {
        this.resolve(expr.expression);
    }
    visitReturnStmt(stmt) {
        if (!this.inFunction) {
            throw new Types_1.ResolvingError(stmt.keyword, "Can't return from top-level code.");
        }
        if (stmt.value !== null) {
            this.resolve(stmt.value);
        }
    }
}
exports.Resolver = Resolver;
