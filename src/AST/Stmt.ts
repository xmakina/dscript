import { Expr } from './Expr'
import { Token } from '../Scanner/Token'
export interface StmtVisitor<R> {
  visitBlockStmt: (stmt: BlockStmt) => R
  visitExpressionStmt: (stmt: ExpressionStmt) => R
  visitFunctionStmt: (stmt: FunctionStmt) => R
  visitIfStmt: (stmt: IfStmt) => R
  visitInputStmt: (stmt: InputStmt) => R
  visitPrintStmt: (stmt: PrintStmt) => R
  visitAppendStmt: (stmt: AppendStmt) => R
  visitReplaceStmt: (stmt: ReplaceStmt) => R
  visitReturnStmt: (stmt: ReturnStmt) => R
  visitWhileStmt: (stmt: WhileStmt) => R
  visitLetStmt: (stmt: LetStmt) => R
  visitDimStmt: (stmt: DimStmt) => R
  visitSetStmt: (stmt: SetStmt) => R
  visitSetArrayStmt: (stmt: SetArrayStmt) => R
}

export abstract class Stmt {
  readonly type: string
  abstract accept<R>(visitor: StmtVisitor<R>): R

  constructor (type: string) {
    this.type = type
  }
}
export class BlockStmt extends Stmt {
  public readonly statements: Stmt[]
  constructor (statements: Stmt[]) {
    super('Block')
    this.statements = statements
  }

  accept<R>(visitor: StmtVisitor<R>): R {
    return visitor.visitBlockStmt(this)
  }
}
export class ExpressionStmt extends Stmt {
  public readonly expression: Expr
  constructor (expression: Expr) {
    super('Expression')
    this.expression = expression
  }

  accept<R>(visitor: StmtVisitor<R>): R {
    return visitor.visitExpressionStmt(this)
  }
}
export class FunctionStmt extends Stmt {
  public readonly name: Token
  public readonly params: Token[]
  public readonly body: Stmt[]
  constructor (name: Token, params: Token[], body: Stmt[]) {
    super('Function')
    this.name = name
    this.params = params
    this.body = body
  }

  accept<R>(visitor: StmtVisitor<R>): R {
    return visitor.visitFunctionStmt(this)
  }
}
export class IfStmt extends Stmt {
  public readonly condition: Expr
  public readonly thenBranch: Stmt
  public readonly elseBranch?: Stmt
  constructor (condition: Expr, thenBranch: Stmt, elseBranch?: Stmt) {
    super('If')
    this.condition = condition
    this.thenBranch = thenBranch
    this.elseBranch = elseBranch
  }

  accept<R>(visitor: StmtVisitor<R>): R {
    return visitor.visitIfStmt(this)
  }
}
export class InputStmt extends Stmt {
  public readonly name: Token
  public readonly prompt: Expr
  constructor (name: Token, prompt: Expr) {
    super('Input')
    this.name = name
    this.prompt = prompt
  }

  accept<R>(visitor: StmtVisitor<R>): R {
    return visitor.visitInputStmt(this)
  }
}
export class PrintStmt extends Stmt {
  public readonly expression: Expr
  constructor (expression: Expr) {
    super('Print')
    this.expression = expression
  }

  accept<R>(visitor: StmtVisitor<R>): R {
    return visitor.visitPrintStmt(this)
  }
}
export class AppendStmt extends Stmt {
  public readonly expression: Expr
  constructor (expression: Expr) {
    super('Append')
    this.expression = expression
  }

  accept<R>(visitor: StmtVisitor<R>): R {
    return visitor.visitAppendStmt(this)
  }
}
export class ReplaceStmt extends Stmt {
  public readonly expression: Expr
  constructor (expression: Expr) {
    super('Replace')
    this.expression = expression
  }

  accept<R>(visitor: StmtVisitor<R>): R {
    return visitor.visitReplaceStmt(this)
  }
}
export class ReturnStmt extends Stmt {
  public readonly keyword: Token
  public readonly value: Expr|null
  constructor (keyword: Token, value: Expr|null) {
    super('Return')
    this.keyword = keyword
    this.value = value
  }

  accept<R>(visitor: StmtVisitor<R>): R {
    return visitor.visitReturnStmt(this)
  }
}
export class WhileStmt extends Stmt {
  public readonly condition: Expr
  public readonly body: Stmt
  constructor (condition: Expr, body: Stmt) {
    super('While')
    this.condition = condition
    this.body = body
  }

  accept<R>(visitor: StmtVisitor<R>): R {
    return visitor.visitWhileStmt(this)
  }
}
export class LetStmt extends Stmt {
  public readonly name: Token
  public readonly initializer: Expr
  constructor (name: Token, initializer: Expr) {
    super('Let')
    this.name = name
    this.initializer = initializer
  }

  accept<R>(visitor: StmtVisitor<R>): R {
    return visitor.visitLetStmt(this)
  }
}
export class DimStmt extends Stmt {
  public readonly name: Token
  constructor (name: Token) {
    super('Dim')
    this.name = name
  }

  accept<R>(visitor: StmtVisitor<R>): R {
    return visitor.visitDimStmt(this)
  }
}
export class SetStmt extends Stmt {
  public readonly name: Token
  public readonly value: Expr
  constructor (name: Token, value: Expr) {
    super('Set')
    this.name = name
    this.value = value
  }

  accept<R>(visitor: StmtVisitor<R>): R {
    return visitor.visitSetStmt(this)
  }
}
export class SetArrayStmt extends Stmt {
  public readonly name: Token
  public readonly index: Expr
  public readonly value: Expr
  constructor (name: Token, index: Expr, value: Expr) {
    super('SetArray')
    this.name = name
    this.index = index
    this.value = value
  }

  accept<R>(visitor: StmtVisitor<R>): R {
    return visitor.visitSetArrayStmt(this)
  }
}
