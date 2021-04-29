"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayAssignExpr = exports.AssignExpr = exports.ArrayVariableExpr = exports.VariableExpr = exports.LogicalExpr = exports.CallExpr = exports.UnaryExpr = exports.LiteralExpr = exports.GroupingExpr = exports.BinaryExpr = exports.Expr = void 0;
class Expr {
    constructor(type) {
        this.type = type;
    }
}
exports.Expr = Expr;
class BinaryExpr extends Expr {
    constructor(left, operator, right) {
        super('Binary');
        this.left = left;
        this.operator = operator;
        this.right = right;
    }
    accept(visitor) {
        return visitor.visitBinaryExpr(this);
    }
}
exports.BinaryExpr = BinaryExpr;
class GroupingExpr extends Expr {
    constructor(expression) {
        super('Grouping');
        this.expression = expression;
    }
    accept(visitor) {
        return visitor.visitGroupingExpr(this);
    }
}
exports.GroupingExpr = GroupingExpr;
class LiteralExpr extends Expr {
    constructor(value) {
        super('Literal');
        this.value = value;
    }
    accept(visitor) {
        return visitor.visitLiteralExpr(this);
    }
}
exports.LiteralExpr = LiteralExpr;
class UnaryExpr extends Expr {
    constructor(operator, right) {
        super('Unary');
        this.operator = operator;
        this.right = right;
    }
    accept(visitor) {
        return visitor.visitUnaryExpr(this);
    }
}
exports.UnaryExpr = UnaryExpr;
class CallExpr extends Expr {
    constructor(callee, paren, args) {
        super('Call');
        this.callee = callee;
        this.paren = paren;
        this.args = args;
    }
    accept(visitor) {
        return visitor.visitCallExpr(this);
    }
}
exports.CallExpr = CallExpr;
class LogicalExpr extends Expr {
    constructor(left, operator, right) {
        super('Logical');
        this.left = left;
        this.operator = operator;
        this.right = right;
    }
    accept(visitor) {
        return visitor.visitLogicalExpr(this);
    }
}
exports.LogicalExpr = LogicalExpr;
class VariableExpr extends Expr {
    constructor(name) {
        super('Variable');
        this.name = name;
    }
    accept(visitor) {
        return visitor.visitVariableExpr(this);
    }
}
exports.VariableExpr = VariableExpr;
class ArrayVariableExpr extends Expr {
    constructor(name, index) {
        super('ArrayVariable');
        this.name = name;
        this.index = index;
    }
    accept(visitor) {
        return visitor.visitArrayVariableExpr(this);
    }
}
exports.ArrayVariableExpr = ArrayVariableExpr;
class AssignExpr extends Expr {
    constructor(name, value) {
        super('Assign');
        this.name = name;
        this.value = value;
    }
    accept(visitor) {
        return visitor.visitAssignExpr(this);
    }
}
exports.AssignExpr = AssignExpr;
class ArrayAssignExpr extends Expr {
    constructor(name, index, value) {
        super('ArrayAssign');
        this.name = name;
        this.index = index;
        this.value = value;
    }
    accept(visitor) {
        return visitor.visitArrayAssignExpr(this);
    }
}
exports.ArrayAssignExpr = ArrayAssignExpr;
