import Parser from '..'
import { WhileStmt } from '../../AST'
import { TokenType } from '../../Types'
import Block from './Block'
import Expression from '../Expr/Expression'

export default function While (parser: Parser): WhileStmt {
  const condition = Expression(parser)
  parser.consume(TokenType.NEWLINE, 'Expect new line after WHILE condition.')

  const body = Block(parser)(TokenType.WEND)

  return new WhileStmt(condition, body)
}
