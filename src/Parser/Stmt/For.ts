import { Stmt, VariableExpr, LetStmt, BinaryExpr, Expr, LiteralExpr, SetStmt, BlockStmt, WhileStmt } from '../../AST'
import { Token } from '../../Scanner/Token'
import { TokenType, ParseError } from '../../Types'
import Expression from '../Expr/Expression'
import Parser from '../Parser'
import Block from './Block'

export default function For (parser: Parser): Stmt {
  const name = parser.consume(TokenType.IDENTIFIER, 'Expect variable name.')
  parser.consume(TokenType.EQUAL, 'Expect equal after variable name.')
  const value = Expression(parser)
  const initializer = new LetStmt(name, value)

  parser.consume(TokenType.TO, 'Expect TO after variable setup.')
  const maxValue = Expression(parser)
  const condition = new BinaryExpr(new VariableExpr(name), new Token(TokenType.UNEQUAL, '<>', '<>', name.line), maxValue)

  let incrementValue: Expr = new LiteralExpr(1)
  if (parser.match(TokenType.STEP)) {
    incrementValue = Expression(parser)
  }

  const incrementExpr = new BinaryExpr(new VariableExpr(name), new Token(TokenType.PLUS, '+', '+', name.line), incrementValue)
  const increment = new SetStmt(name, incrementExpr)
  parser.consume(TokenType.NEWLINE, 'Expect new line after FOR statement.')

  let body: Stmt = Block(parser)(TokenType.NEXT, false)
  body = new BlockStmt([body, increment]) // Append the increment
  body = new WhileStmt(condition, body) // Setup the while statement
  body = new BlockStmt([initializer, body]) // Prepend the initializer

  if (parser.check(TokenType.IDENTIFIER)) {
    const target = parser.consume(TokenType.IDENTIFIER, '')
    if (target.lexeme !== name.lexeme) {
      throw new ParseError(target, `Expect NEXT to refer to variable ${name.lexeme}`)
    }
  }

  parser.consume(TokenType.NEWLINE, 'Expect new line after NEXT.')

  return body
}
