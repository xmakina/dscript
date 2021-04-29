import { IfStmt, Stmt } from '../../AST'
import { TokenType } from '../../Types'
import Expression from '../Expr/Expression'
import Parser from '../Parser'
import Statement from './Statement'

export default function If (parser: Parser): IfStmt {
  const condition = Expression(parser)
  parser.consume(TokenType.THEN, "Expect 'THEN' after IF condition.")
  const thenBranch = Statement(parser)
  let elseBranch: Stmt | undefined

  if (parser.match(TokenType.ELSE)) {
    elseBranch = Statement(parser)
  }

  return new IfStmt(condition, thenBranch, elseBranch)
}
