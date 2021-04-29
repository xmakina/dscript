import { InputStmt, Expr, LiteralExpr } from '../../AST'
import { TokenType } from '../../Types'
import Parser from '../Parser'
import Expression from '../Expr/Expression'

export default (parser: Parser): InputStmt => {
  const name = parser.consume(TokenType.IDENTIFIER, 'Expect variable name')

  let prompt: Expr
  if (parser.check(TokenType.STRING)) {
    prompt = Expression(parser)
  } else {
    prompt = new LiteralExpr('')
  }

  return new InputStmt(name, prompt)
}
