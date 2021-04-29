import Parser from '..'
import { Stmt, ExpressionStmt } from '../../AST'
import { TokenType } from '../../Types'
import Append from './Append'
import Dim from './Dim'
import Expression from '../Expr/Expression'
import Func from './Func'
import If from './If'
import Input from './Input'
import Let from './Let'
import Print from './Print'
import Replace from './Replace'
import Set from './Set'
import For from './For'
import While from './While'
import Return from './Return'

export default function Statement (parser: Parser): Stmt {
  if (parser.match(TokenType.LET)) return Let(parser)
  if (parser.match(TokenType.DIM)) return Dim(parser)
  if (parser.match(TokenType.DEF)) return Func(parser)
  if (parser.match(TokenType.PRINT)) return Print(parser)
  if (parser.match(TokenType.SET)) return Set(parser)
  if (parser.match(TokenType.IF)) return If(parser)
  if (parser.match(TokenType.WHILE)) return While(parser)
  if (parser.match(TokenType.FOR)) return For(parser)
  if (parser.match(TokenType.APPEND)) return Append(parser)
  if (parser.match(TokenType.REPLACE)) return Replace(parser)
  if (parser.match(TokenType.INPUT)) return Input(parser)
  if (parser.match(TokenType.RETURN)) return Return(parser)

  const expr = Expression(parser)
  parser.consume(TokenType.NEWLINE, 'Expect newline after expression')
  return new ExpressionStmt(expr)
}
