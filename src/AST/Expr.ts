import { Token } from '../Scanner/Token'
import { DScriptObject } from '../Types'
export interface ExprVisitor<R> {
  visitBinaryExpr: (expr: BinaryExpr) => R
  visitGroupingExpr: (expr: GroupingExpr) => R
  visitLiteralExpr: (expr: LiteralExpr) => R
  visitUnaryExpr: (expr: UnaryExpr) => R
  visitCallExpr: (expr: CallExpr) => R
  visitLogicalExpr: (expr: LogicalExpr) => R
  visitVariableExpr: (expr: VariableExpr) => R
  visitArrayVariableExpr: (expr: ArrayVariableExpr) => R
  visitAssignExpr: (expr: AssignExpr) => R
  visitArrayAssignExpr: (expr: ArrayAssignExpr) => R
}

export abstract class Expr {
  readonly type: string
  abstract accept<R>(visitor: ExprVisitor<R>): R

  constructor (type: string) {
    this.type = type
  }
}
export class BinaryExpr extends Expr {
  public readonly left: Expr
  public readonly operator: Token
  public readonly right: Expr
  constructor (left: Expr, operator: Token, right: Expr) {
    super('Binary')
    this.left = left
    this.operator = operator
    this.right = right
  }

  accept<R>(visitor: ExprVisitor<R>): R {
    return visitor.visitBinaryExpr(this)
  }
}
export class GroupingExpr extends Expr {
  public readonly expression: Expr
  constructor (expression: Expr) {
    super('Grouping')
    this.expression = expression
  }

  accept<R>(visitor: ExprVisitor<R>): R {
    return visitor.visitGroupingExpr(this)
  }
}
export class LiteralExpr extends Expr {
  public readonly value: DScriptObject
  constructor (value: DScriptObject) {
    super('Literal')
    this.value = value
  }

  accept<R>(visitor: ExprVisitor<R>): R {
    return visitor.visitLiteralExpr(this)
  }
}
export class UnaryExpr extends Expr {
  public readonly operator: Token
  public readonly right: Expr
  constructor (operator: Token, right: Expr) {
    super('Unary')
    this.operator = operator
    this.right = right
  }

  accept<R>(visitor: ExprVisitor<R>): R {
    return visitor.visitUnaryExpr(this)
  }
}
export class CallExpr extends Expr {
  public readonly callee: Expr
  public readonly paren: Token
  public readonly args: Expr[]
  constructor (callee: Expr, paren: Token, args: Expr[]) {
    super('Call')
    this.callee = callee
    this.paren = paren
    this.args = args
  }

  accept<R>(visitor: ExprVisitor<R>): R {
    return visitor.visitCallExpr(this)
  }
}
export class LogicalExpr extends Expr {
  public readonly left: Expr
  public readonly operator: Token
  public readonly right: Expr
  constructor (left: Expr, operator: Token, right: Expr) {
    super('Logical')
    this.left = left
    this.operator = operator
    this.right = right
  }

  accept<R>(visitor: ExprVisitor<R>): R {
    return visitor.visitLogicalExpr(this)
  }
}
export class VariableExpr extends Expr {
  public readonly name: Token
  constructor (name: Token) {
    super('Variable')
    this.name = name
  }

  accept<R>(visitor: ExprVisitor<R>): R {
    return visitor.visitVariableExpr(this)
  }
}
export class ArrayVariableExpr extends Expr {
  public readonly name: Token
  public readonly index: Expr
  constructor (name: Token, index: Expr) {
    super('ArrayVariable')
    this.name = name
    this.index = index
  }

  accept<R>(visitor: ExprVisitor<R>): R {
    return visitor.visitArrayVariableExpr(this)
  }
}
export class AssignExpr extends Expr {
  public readonly name: Token
  public readonly value: Expr
  constructor (name: Token, value: Expr) {
    super('Assign')
    this.name = name
    this.value = value
  }

  accept<R>(visitor: ExprVisitor<R>): R {
    return visitor.visitAssignExpr(this)
  }
}
export class ArrayAssignExpr extends Expr {
  public readonly name: Token
  public readonly index: Expr
  public readonly value: Expr
  constructor (name: Token, index: Expr, value: Expr) {
    super('ArrayAssign')
    this.name = name
    this.index = index
    this.value = value
  }

  accept<R>(visitor: ExprVisitor<R>): R {
    return visitor.visitArrayAssignExpr(this)
  }
}
