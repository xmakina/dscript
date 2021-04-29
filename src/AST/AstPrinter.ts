import { AssignExpr } from '.'
import { ArrayAssignExpr, ArrayVariableExpr, BinaryExpr, CallExpr, Expr, ExprVisitor, GroupingExpr, LiteralExpr, LogicalExpr, UnaryExpr, VariableExpr } from './Expr'
import { BlockStmt, DimStmt, ExpressionStmt, FunctionStmt, IfStmt, InputStmt, LetStmt, PrintStmt, ReturnStmt, SetArrayStmt, SetStmt, Stmt, StmtVisitor, WhileStmt } from './Stmt'

export class AstPrinter implements StmtVisitor<string>, ExprVisitor<string> {
  // Print AST as S-expressions
  stringify (target: Expr | Stmt | Stmt[]): string {
    if (target instanceof Array) {
      return target.map((stmt) => stmt.accept(this)).join('\n')
    } else {
      return target.accept(this)
    }
  }

  private parenthesize (name: string, ...exprs: Expr[]): string {
    let result = ''

    result += `(${name}`
    for (const expr of exprs) {
      result += ` ${expr.accept(this)}`
    }
    result += ')'

    return result
  }

  private indent (lines: string): string {
    return lines
      .split('\n')
      .map((line) => '  ' + line)
      .join('\n')
  }

  visitBinaryExpr (expr: BinaryExpr): string {
    return this.parenthesize(expr.operator.lexeme, expr.left, expr.right)
  }

  visitGroupingExpr (expr: GroupingExpr): string {
    return this.parenthesize('group', expr.expression)
  }

  visitLiteralExpr (expr: LiteralExpr): string {
    if (expr.value === null) return 'nil'
    if (typeof expr.value === 'string') return `"${expr.value}"`
    return expr.value.toString()
  }

  visitUnaryExpr (expr: UnaryExpr): string {
    return this.parenthesize(expr.operator.lexeme, expr.right)
  }

  visitVariableExpr (expr: VariableExpr): string {
    return expr.name.lexeme
  }

  visitArrayVariableExpr (expr: ArrayVariableExpr): string {
    return expr.name.lexeme
  }

  visitLogicalExpr (expr: LogicalExpr): string {
    return this.parenthesize(expr.operator.lexeme, expr.left, expr.right)
  }

  visitCallExpr (expr: CallExpr): string {
    return this.parenthesize('call', expr.callee, ...expr.args)
  }

  visitPrintStmt (stmt: PrintStmt): string {
    return this.parenthesize('print', stmt.expression)
  }

  visitAppendStmt (stmt: PrintStmt): string {
    return this.parenthesize('append', stmt.expression)
  }

  visitReplaceStmt (stmt: PrintStmt): string {
    return this.parenthesize('replace', stmt.expression)
  }

  visitExpressionStmt (stmt: ExpressionStmt): string {
    return this.parenthesize('expression', stmt.expression)
  }

  visitDimStmt (stmt: DimStmt): string {
    const name = new VariableExpr(stmt.name)
    return this.parenthesize('dim', name)
  }

  visitSetArrayStmt (stmt: SetArrayStmt): string {
    const name = new VariableExpr(stmt.name)
    return this.parenthesize('set array', name, stmt.index, stmt.value)
  }

  visitLetStmt (stmt: LetStmt): string {
    const name = new VariableExpr(stmt.name)
    if (stmt.initializer != null) {
      return this.parenthesize('var', name, stmt.initializer)
    } else {
      return this.parenthesize('var', name)
    }
  }

  visitSetStmt (stmt: SetStmt): string {
    const name = new VariableExpr(stmt.name)
    if (stmt.value != null) {
      return this.parenthesize('var', name, stmt.value)
    } else {
      return this.parenthesize('var', name)
    }
  }

  visitInputStmt (stmt: InputStmt): string {
    const name = new VariableExpr(stmt.name)
    if (stmt.prompt != null) {
      return this.parenthesize('prompt', name, stmt.prompt)
    } else {
      return this.parenthesize('prompt', name)
    }
  }

  visitBlockStmt (stmt: BlockStmt): string {
    let result = '(block'
    stmt.statements.forEach((innerStmt) => {
      result += '\n' + this.indent(this.stringify(innerStmt))
    })
    result += ')'

    return result
  }

  visitIfStmt (stmt: IfStmt): string {
    let result = `(if ${this.stringify(stmt.condition)}\n`

    const thenBranchResult = this.stringify(stmt.thenBranch)
    result += this.indent(thenBranchResult)

    if (stmt.elseBranch !== undefined) {
      result += '\n'
      const elseBranchResult = this.stringify(stmt.elseBranch)
      result += this.indent(elseBranchResult)
    }
    result += ')'

    return result
  }

  visitWhileStmt (stmt: WhileStmt): string {
    let result = `(while ${this.stringify(stmt.condition)}\n`
    const bodyResult = this.stringify(stmt.body)
    result += this.indent(bodyResult) + ')'

    return result
  }

  visitFunctionStmt (stmt: FunctionStmt): string {
    const name = new VariableExpr(stmt.name)
    return this.parenthesize('function', name)
  }

  visitReturnStmt (stmt: ReturnStmt): string {
    const name = new VariableExpr(stmt.keyword)
    return stmt.value === null
      ? this.parenthesize('return', name)
      : this.parenthesize('return', name, stmt.value)
  }

  visitAssignExpr (expr: AssignExpr): string {
    const name = new VariableExpr(expr.name)
    return this.parenthesize('assign', name, expr.value)
  }

  visitArrayAssignExpr (expr: ArrayAssignExpr): string {
    const name = new VariableExpr(expr.name)
    return this.parenthesize('assign array', name, expr.index, expr.value)
  }
}
