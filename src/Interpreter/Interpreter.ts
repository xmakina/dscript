import { Expr, ExprVisitor } from '../AST'
import { Stmt, StmtVisitor } from '../AST/Stmt'
import { IOutput } from '../DScript'
import { IEnvironment } from '../Environment'
import { DScriptObject, DScriptError, RuntimeError } from '../Types'
import VisitArrayVariableExpr from './Expr/VisitArrayVariableExpr'
import VisitBinaryExpr from './Expr/VisitBinaryExpr'
import VisitGroupingExpr from './Expr/VisitGroupingExpr'
import VisitLogicalExpr from './Expr/VisitLogicalExpr'
import VisitUnaryExpr from './Expr/VisitUnaryExpr'
import VisitVariableExpr from './Expr/VisitVariableExpr'
import ClockFunction from './Func/ClockFunction'
import VisitAppendStmt from './Stmt/VisitAppendStmt'
import VisitBlockStmt from './Stmt/VisitBlockStmt'
import VisitDimStmt from './Stmt/VisitDimStmt'
import VisitExpressionStmt from './Stmt/VisitExpressionStmt'
import VisitIfStmt from './Stmt/VisitIfStmt'
import VisitLetStmt from './Stmt/VisitLetStmt'
import VisitPrintStmt from './Stmt/VisitPrintStmt'
import VisitReplaceStmt from './Stmt/VisitReplaceStmt'
import VisitSetArrayStmt from './Stmt/VisitSetArrayStmt'
import VisitSetStmt from './Stmt/VisitSetStmt'
import VisitWhileStmt from './Stmt/VisitWhileStmt'
import VisitCallExpr from './Expr/VisitCallExpr'
import VisitInputStmt from './Stmt/VisitInputStmt'
import VisitLiteralExpr from './Expr/VisitLiteralExpr'
import VisitFunctionStmt from './Stmt/VisitFunctionStmt'
import VisitReturnStmt from './Stmt/VisitReturnStmt'
import VisitAssignExpr from './Expr/VisitAssignExpr'
import { Token } from '../Scanner/Token'
import VisitArrayAssignExpr from './Expr/VisitArrayAssignExpr'
import IsNumberFunction from './Func/IsNumberFunction'

export interface IInterpreter extends ExprVisitor<Promise<DScriptObject>>, StmtVisitor<Promise<void>> {
  lookUpVariable: (name: Token, expr: Expr) => DScriptObject
  resolve: (expr: Expr, distance: number) => void
  globals: IEnvironment
  environment: IEnvironment
  output: IOutput
  interpret: (statements: Stmt[]) => Promise<void>
  evaluate: (expr: Expr) => Promise<DScriptObject>
  execute: (stmt: Stmt) => Promise<void>
  executeBlock: (statements: Stmt[], environment: IEnvironment) => Promise<void>
  locals: Map<Expr, number>
}

export default class Interpreter implements IInterpreter {
  public readonly output: IOutput
  private readonly report: (error: DScriptError) => void
  public globals: IEnvironment
  public environment: IEnvironment
  locals: Map<Expr, number> = new Map()

  constructor (output: IOutput, report: (error: DScriptError) => void, globals: IEnvironment) {
    this.globals = globals
    this.globals.define('CLOCK', new ClockFunction())
    this.globals.define('IS_NUMBER', new IsNumberFunction())

    this.output = output
    this.report = report

    this.environment = this.globals
  }

  async interpret (statements: Stmt[]): Promise<void> {
    try {
      for (const statement of statements) {
        await this.execute(statement)
      }
    } catch (error) {
      if (error instanceof RuntimeError) {
        return this.report(error)
      }

      throw error
    }
  }

  async evaluate (expr: Expr): Promise<DScriptObject> {
    return await expr.accept(this)
  }

  async execute (stmt: Stmt): Promise<void> {
    await stmt.accept(this)
  }

  async executeBlock (statements: Stmt[], environment: IEnvironment): Promise<void> {
    const previous = this.environment
    try {
      this.environment = environment
      for (const statement of statements) {
        await this.execute(statement)
      }
    } finally {
      this.environment = previous
    }
  }

  lookUpVariable (name: Token, expr: Expr): DScriptObject {
    const distance = this.locals.get(expr)
    if (distance !== undefined) {
      return this.environment.getAt(distance, name)
    } else {
      return this.globals.get(name)
    }
  }

  resolve (expr: Expr, depth: number): void {
    if (this.locals.has(expr)) {
      throw new Error('Expression already locally resolved')
    }
    this.locals.set(expr, depth)
  }

  visitBinaryExpr = VisitBinaryExpr(this)
  visitGroupingExpr = VisitGroupingExpr(this)
  visitLiteralExpr = VisitLiteralExpr
  visitUnaryExpr = VisitUnaryExpr(this)
  visitCallExpr = VisitCallExpr(this)
  visitLogicalExpr = VisitLogicalExpr(this)
  visitArrayVariableExpr = VisitArrayVariableExpr(this)
  visitVariableExpr = VisitVariableExpr(this)
  visitBlockStmt = VisitBlockStmt(this)
  visitExpressionStmt = VisitExpressionStmt(this)
  visitIfStmt = VisitIfStmt(this)
  visitInputStmt = VisitInputStmt(this)
  visitPrintStmt = VisitPrintStmt(this)
  visitAppendStmt = VisitAppendStmt(this)
  visitReplaceStmt = VisitReplaceStmt(this)
  visitDimStmt = VisitDimStmt(this)
  visitLetStmt = VisitLetStmt(this)
  visitSetStmt = VisitSetStmt(this)
  visitSetArrayStmt = VisitSetArrayStmt(this)
  visitWhileStmt = VisitWhileStmt(this)
  visitFunctionStmt = VisitFunctionStmt(this)
  visitReturnStmt = VisitReturnStmt(this)
  visitAssignExpr = VisitAssignExpr(this)
  visitArrayAssignExpr = VisitArrayAssignExpr(this)
}
