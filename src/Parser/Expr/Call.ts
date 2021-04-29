import Parser from '..'
import { Expr, CallExpr } from '../../AST'
import { TokenType, ParseError } from '../../Types'
import Expression from './Expression'
import Primary from './Primary'

export default (parser: Parser): Expr => {
  let expr = Primary(parser)

  for (;;) {
    if (parser.match(TokenType.LEFT_PAREN)) {
      expr = finishCall(expr)
    } else {
      break
    }
  }

  return expr

  function finishCall (callee: Expr): Expr {
    const args: Expr[] = []
    if (!parser.check(TokenType.RIGHT_PAREN)) {
      do {
        if (args.length >= 255) {
          throw new ParseError(parser.peek(), "Can't have more than 255 arguments.")
        }

        args.push(Expression(parser))
      } while (parser.match(TokenType.COMMA))
    }

    const paren = parser.consume(TokenType.RIGHT_PAREN, "Expect ')' after arguments.")

    return new CallExpr(callee, paren, args)
  }
}
