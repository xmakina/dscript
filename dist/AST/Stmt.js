"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetArrayStmt = exports.SetStmt = exports.DimStmt = exports.LetStmt = exports.WhileStmt = exports.ReturnStmt = exports.ReplaceStmt = exports.AppendStmt = exports.PrintStmt = exports.InputStmt = exports.IfStmt = exports.FunctionStmt = exports.ExpressionStmt = exports.BlockStmt = exports.Stmt = void 0;
class Stmt {
    constructor(type) {
        this.type = type;
    }
}
exports.Stmt = Stmt;
class BlockStmt extends Stmt {
    constructor(statements) {
        super('Block');
        this.statements = statements;
    }
    accept(visitor) {
        return visitor.visitBlockStmt(this);
    }
}
exports.BlockStmt = BlockStmt;
class ExpressionStmt extends Stmt {
    constructor(expression) {
        super('Expression');
        this.expression = expression;
    }
    accept(visitor) {
        return visitor.visitExpressionStmt(this);
    }
}
exports.ExpressionStmt = ExpressionStmt;
class FunctionStmt extends Stmt {
    constructor(name, params, body) {
        super('Function');
        this.name = name;
        this.params = params;
        this.body = body;
    }
    accept(visitor) {
        return visitor.visitFunctionStmt(this);
    }
}
exports.FunctionStmt = FunctionStmt;
class IfStmt extends Stmt {
    constructor(condition, thenBranch, elseBranch) {
        super('If');
        this.condition = condition;
        this.thenBranch = thenBranch;
        this.elseBranch = elseBranch;
    }
    accept(visitor) {
        return visitor.visitIfStmt(this);
    }
}
exports.IfStmt = IfStmt;
class InputStmt extends Stmt {
    constructor(name, prompt) {
        super('Input');
        this.name = name;
        this.prompt = prompt;
    }
    accept(visitor) {
        return visitor.visitInputStmt(this);
    }
}
exports.InputStmt = InputStmt;
class PrintStmt extends Stmt {
    constructor(expression) {
        super('Print');
        this.expression = expression;
    }
    accept(visitor) {
        return visitor.visitPrintStmt(this);
    }
}
exports.PrintStmt = PrintStmt;
class AppendStmt extends Stmt {
    constructor(expression) {
        super('Append');
        this.expression = expression;
    }
    accept(visitor) {
        return visitor.visitAppendStmt(this);
    }
}
exports.AppendStmt = AppendStmt;
class ReplaceStmt extends Stmt {
    constructor(expression) {
        super('Replace');
        this.expression = expression;
    }
    accept(visitor) {
        return visitor.visitReplaceStmt(this);
    }
}
exports.ReplaceStmt = ReplaceStmt;
class ReturnStmt extends Stmt {
    constructor(keyword, value) {
        super('Return');
        this.keyword = keyword;
        this.value = value;
    }
    accept(visitor) {
        return visitor.visitReturnStmt(this);
    }
}
exports.ReturnStmt = ReturnStmt;
class WhileStmt extends Stmt {
    constructor(condition, body) {
        super('While');
        this.condition = condition;
        this.body = body;
    }
    accept(visitor) {
        return visitor.visitWhileStmt(this);
    }
}
exports.WhileStmt = WhileStmt;
class LetStmt extends Stmt {
    constructor(name, initializer) {
        super('Let');
        this.name = name;
        this.initializer = initializer;
    }
    accept(visitor) {
        return visitor.visitLetStmt(this);
    }
}
exports.LetStmt = LetStmt;
class DimStmt extends Stmt {
    constructor(name) {
        super('Dim');
        this.name = name;
    }
    accept(visitor) {
        return visitor.visitDimStmt(this);
    }
}
exports.DimStmt = DimStmt;
class SetStmt extends Stmt {
    constructor(name, value) {
        super('Set');
        this.name = name;
        this.value = value;
    }
    accept(visitor) {
        return visitor.visitSetStmt(this);
    }
}
exports.SetStmt = SetStmt;
class SetArrayStmt extends Stmt {
    constructor(name, index, value) {
        super('SetArray');
        this.name = name;
        this.index = index;
        this.value = value;
    }
    accept(visitor) {
        return visitor.visitSetArrayStmt(this);
    }
}
exports.SetArrayStmt = SetArrayStmt;
