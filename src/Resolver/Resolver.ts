import { ArrayAssignExpr, ArrayVariableExpr, AssignExpr, BinaryExpr, BlockStmt, CallExpr, DimStmt, Expr, ExpressionStmt, ExprVisitor, FunctionStmt, GroupingExpr, IfStmt, InputStmt, LetStmt, LogicalExpr, PrintStmt, ReturnStmt, SetArrayStmt, SetStmt, Stmt, StmtVisitor, UnaryExpr, VariableExpr, WhileStmt } from '../AST'
import { IInterpreter } from '../Interpreter'
import { Token } from '../Scanner/Token'
import { DScriptError, ResolvingError } from '../Types'
import { Scopes } from './Scopes'

export class Resolver implements ExprVisitor<void>, StmtVisitor<void> {
  private readonly interpreter: IInterpreter
  private readonly scopes: Scopes = new Scopes()
  private readonly report: (error: DScriptError) => void
  private inFunction = false

  constructor (interpreter: IInterpreter, report: (error: DScriptError) => void) {
    this.interpreter = interpreter
    this.report = report
  }

  resolve (expr: Expr): void
  resolve (stmt: Stmt): void
  resolve (statements: Stmt[]): void
  resolve (target: Expr | Stmt | Stmt[]): void {
    if (Array.isArray(target)) {
      for (const stmt of target) {
        this.resolve(stmt)
      }
    } else {
      try {
        target.accept(this)
      } catch (error) {
        if (error instanceof DScriptError) {
          this.report(error)
        } else {
          throw error
        }
      }
    }
  }

  private resolveLocal (expr: Expr, name: Token): void {
    const distance = this.scopes.getDistance(name.lexeme)

    if (distance !== null) {
      this.interpreter.resolve(expr, distance)
    }
  }

  private declare (name: Token): void {
    if (this.scopes.isEmpty()) {
      return
    }

    const scope = this.scopes.peek()

    if (scope.includes(name.lexeme)) {
      throw new ResolvingError(name, 'Already variable with this name in this scope.')
    }

    scope.push(name.lexeme)
  }

  private readonly resolveExpressionStmt = (stmt: ExpressionStmt): void => {
    this.resolve(stmt.expression)
  }

  visitExpressionStmt = this.resolveExpressionStmt
  visitAppendStmt = this.resolveExpressionStmt
  visitPrintStmt = (stmt: PrintStmt): void => {
    this.resolve(stmt.expression)
  }

  visitReplaceStmt = this.resolveExpressionStmt

  visitArrayVariableExpr (expr: ArrayVariableExpr): void {
    this.resolve(expr.index)
    this.resolveLocal(expr, expr.name)
  }

  visitVariableExpr (expr: VariableExpr): void {
    this.resolveLocal(expr, expr.name)
  }

  visitAssignExpr = (expr: AssignExpr): void => {
    this.resolve(expr.value)
    this.resolveLocal(expr, expr.name)
  }

  visitArrayAssignExpr = (expr: ArrayAssignExpr): void => {
    this.resolve(expr.index)
    this.resolve(expr.value)
    this.resolveLocal(expr, expr.name)
  }

  visitBinaryExpr = (expr: BinaryExpr): void => {
    this.resolve(expr.left)
    this.resolve(expr.right)
  }

  visitBlockStmt = (stmt: BlockStmt): void => {
    this.scopes.beginScope()
    this.resolve(stmt.statements)
    this.scopes.endScope()
  }

  visitCallExpr = (expr: CallExpr): void => {
    this.resolve(expr.callee)
    for (const arg of expr.args) {
      this.resolve(arg)
    }
  }

  visitFunctionStmt (stmt: FunctionStmt): void {
    const enclosingFunction = this.inFunction
    this.inFunction = true
    this.declare(stmt.name)
    this.scopes.beginScope()

    for (const param of stmt.params) {
      this.declare(param)
    }

    this.resolve(stmt.body)
    this.scopes.endScope()
    this.inFunction = enclosingFunction
  }

  visitGroupingExpr (expr: GroupingExpr): void {
    this.resolve(expr.expression)
  }

  visitIfStmt = (stmt: IfStmt): void => {
    this.resolve(stmt.condition)
    this.resolve(stmt.thenBranch)
    if (stmt.elseBranch !== undefined) {
      this.resolve(stmt.elseBranch)
    }
  }

  visitInputStmt = (stmt: InputStmt): void => {
    this.resolve(stmt.prompt)
  }

  visitLetStmt = (stmt: LetStmt): void => {
    this.declare(stmt.name)
    this.resolve(stmt.initializer)
  }

  visitDimStmt = (stmt: DimStmt): void => {
    this.declare(stmt.name)
  }

  visitSetStmt = (stmt: SetStmt): void => {
    this.resolve(stmt.value)
    this.resolveLocal(stmt.value, stmt.name)
  }

  visitSetArrayStmt = (stmt: SetArrayStmt): void => {
    this.resolve(stmt.index)
    this.resolve(stmt.value)
    this.resolveLocal(stmt.value, stmt.name)
  }

  visitLiteralExpr = (): void => {
    // do nothing
  }

  visitLogicalExpr = (expr: LogicalExpr): void => {
    this.resolve(expr.left)
    this.resolve(expr.right)
  }

  visitReturnStmt (stmt: ReturnStmt): void {
    if (!this.inFunction) {
      throw new ResolvingError(stmt.keyword, "Can't return from top-level code.")
    }
    if (stmt.value !== null) {
      this.resolve(stmt.value)
    }
  }

  visitUnaryExpr = (expr: UnaryExpr): void => {
    this.resolve(expr.right)
  }

  visitWhileStmt = (stmt: WhileStmt): void => {
    this.resolve(stmt.condition)
    this.resolve(stmt.body)
  }
}
