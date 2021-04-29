"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AstPrinter = void 0;
const Expr_1 = require("./Expr");
class AstPrinter {
    // Print AST as S-expressions
    stringify(target) {
        if (target instanceof Array) {
            return target.map((stmt) => stmt.accept(this)).join('\n');
        }
        else {
            return target.accept(this);
        }
    }
    parenthesize(name, ...exprs) {
        let result = '';
        result += `(${name}`;
        for (const expr of exprs) {
            result += ` ${expr.accept(this)}`;
        }
        result += ')';
        return result;
    }
    indent(lines) {
        return lines
            .split('\n')
            .map((line) => '  ' + line)
            .join('\n');
    }
    visitBinaryExpr(expr) {
        return this.parenthesize(expr.operator.lexeme, expr.left, expr.right);
    }
    visitGroupingExpr(expr) {
        return this.parenthesize('group', expr.expression);
    }
    visitLiteralExpr(expr) {
        if (expr.value === null)
            return 'nil';
        if (typeof expr.value === 'string')
            return `"${expr.value}"`;
        return expr.value.toString();
    }
    visitUnaryExpr(expr) {
        return this.parenthesize(expr.operator.lexeme, expr.right);
    }
    visitVariableExpr(expr) {
        return expr.name.lexeme;
    }
    visitArrayVariableExpr(expr) {
        return expr.name.lexeme;
    }
    visitLogicalExpr(expr) {
        return this.parenthesize(expr.operator.lexeme, expr.left, expr.right);
    }
    visitCallExpr(expr) {
        return this.parenthesize('call', expr.callee, ...expr.args);
    }
    visitPrintStmt(stmt) {
        return this.parenthesize('print', stmt.expression);
    }
    visitAppendStmt(stmt) {
        return this.parenthesize('append', stmt.expression);
    }
    visitReplaceStmt(stmt) {
        return this.parenthesize('replace', stmt.expression);
    }
    visitExpressionStmt(stmt) {
        return this.parenthesize('expression', stmt.expression);
    }
    visitDimStmt(stmt) {
        const name = new Expr_1.VariableExpr(stmt.name);
        return this.parenthesize('dim', name);
    }
    visitSetArrayStmt(stmt) {
        const name = new Expr_1.VariableExpr(stmt.name);
        return this.parenthesize('set array', name, stmt.index, stmt.value);
    }
    visitLetStmt(stmt) {
        const name = new Expr_1.VariableExpr(stmt.name);
        if (stmt.initializer != null) {
            return this.parenthesize('var', name, stmt.initializer);
        }
        else {
            return this.parenthesize('var', name);
        }
    }
    visitSetStmt(stmt) {
        const name = new Expr_1.VariableExpr(stmt.name);
        if (stmt.value != null) {
            return this.parenthesize('var', name, stmt.value);
        }
        else {
            return this.parenthesize('var', name);
        }
    }
    visitInputStmt(stmt) {
        const name = new Expr_1.VariableExpr(stmt.name);
        if (stmt.prompt != null) {
            return this.parenthesize('prompt', name, stmt.prompt);
        }
        else {
            return this.parenthesize('prompt', name);
        }
    }
    visitBlockStmt(stmt) {
        let result = '(block';
        stmt.statements.forEach((innerStmt) => {
            result += '\n' + this.indent(this.stringify(innerStmt));
        });
        result += ')';
        return result;
    }
    visitIfStmt(stmt) {
        let result = `(if ${this.stringify(stmt.condition)}\n`;
        const thenBranchResult = this.stringify(stmt.thenBranch);
        result += this.indent(thenBranchResult);
        if (stmt.elseBranch !== undefined) {
            result += '\n';
            const elseBranchResult = this.stringify(stmt.elseBranch);
            result += this.indent(elseBranchResult);
        }
        result += ')';
        return result;
    }
    visitWhileStmt(stmt) {
        let result = `(while ${this.stringify(stmt.condition)}\n`;
        const bodyResult = this.stringify(stmt.body);
        result += this.indent(bodyResult) + ')';
        return result;
    }
    visitFunctionStmt(stmt) {
        const name = new Expr_1.VariableExpr(stmt.name);
        return this.parenthesize('function', name);
    }
    visitReturnStmt(stmt) {
        const name = new Expr_1.VariableExpr(stmt.keyword);
        return stmt.value === null
            ? this.parenthesize('return', name)
            : this.parenthesize('return', name, stmt.value);
    }
    visitAssignExpr(expr) {
        const name = new Expr_1.VariableExpr(expr.name);
        return this.parenthesize('assign', name, expr.value);
    }
    visitArrayAssignExpr(expr) {
        const name = new Expr_1.VariableExpr(expr.name);
        return this.parenthesize('assign array', name, expr.index, expr.value);
    }
}
exports.AstPrinter = AstPrinter;
