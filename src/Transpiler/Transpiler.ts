import { Expr, ExprVisitor, Stmt, StmtVisitor } from '../AST'
import { IOutput } from '../DScript'
import { Token } from '../Scanner/Token'
import { DScriptError } from '../Types'
import VisitArrayAssignExpr from './Expr/VisitArrayAssignExpr'
import VisitLiteralExpr from './Expr/VisitLiteralExpr'
import VisitAppendStmt from './Stmt/VisitAppendStmt'

export interface ITranspiler extends ExprVisitor<string>, StmtVisitor<string> {
  getVariableFor: (name: Token) => string
}

export class Transpiler implements ITranspiler {
  output: IOutput
  report: (error: DScriptError) => void

  constructor (output: IOutput, report: (error: DScriptError) => void) {
    this.output = output
    this.report = report
  }

  getVariableFor (name: Token): string {
    return name.lexeme
  }

  transpile (expr: Expr): string
  transpile (stmt: Stmt): string
  transpile (statements: Stmt[]): string
  transpile (target: Expr | Stmt | Stmt[]): string {
    if (Array.isArray(target)) {
      const lines: string[] = []
      for (const stmt of target) {
        lines.push(this.transpile(stmt))
      }

      return lines.join(';\n')
    } else {
      return target.accept(this)
    }
  }

  visitAppendStmt = VisitAppendStmt(this)
  visitArrayAssignExpr = VisitArrayAssignExpr(this)
  visitArrayVariableExpr = (): string => 'Not Implemented'
  visitAssignExpr = (): string => 'Not Implemented'
  visitBinaryExpr = (): string => 'Not Implemented'
  visitBlockStmt = (): string => 'Not Implemented'
  visitCallExpr = (): string => 'Not Implemented'
  visitDimStmt = (): string => 'Not Implemented'
  visitExpressionStmt = (): string => 'Not Implemented'
  visitFunctionStmt = (): string => 'Not Implemented'
  visitGroupingExpr = (): string => 'Not Implemented'
  visitIfStmt = (): string => 'Not Implemented'
  visitInputStmt = (): string => 'Not Implemented'
  visitLetStmt = (): string => 'Not Implemented'
  visitLiteralExpr = VisitLiteralExpr()
  visitLogicalExpr = (): string => 'Not Implemented'
  visitPrintStmt = (): string => 'Not Implemented'
  visitReplaceStmt = (): string => 'Not Implemented'
  visitReturnStmt = (): string => 'Not Implemented'
  visitSetArrayStmt = (): string => 'Not Implemented'
  visitSetStmt = (): string => 'Not Implemented'
  visitUnaryExpr = (): string => 'Not Implemented'
  visitVariableExpr = (): string => 'Not Implemented'
  visitWhileStmt = (): string => 'Not Implemented'
}
