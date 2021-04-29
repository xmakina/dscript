import { TokenType } from './TokenType'

export const keywords: {[index: string]: TokenType} = {
  true: TokenType.TRUE,
  false: TokenType.FALSE,
  null: TokenType.NULL,
  print: TokenType.PRINT,
  dim: TokenType.DIM,
  let: TokenType.LET,
  set: TokenType.SET,
  if: TokenType.IF,
  then: TokenType.THEN,
  else: TokenType.ELSE,
  and: TokenType.AND,
  or: TokenType.OR,
  while: TokenType.WHILE,
  wend: TokenType.WEND,
  for: TokenType.FOR,
  to: TokenType.TO,
  step: TokenType.STEP,
  next: TokenType.NEXT,
  append: TokenType.APPEND,
  replace: TokenType.REPLACE,
  input: TokenType.INPUT,
  def: TokenType.DEF,
  dend: TokenType.DEND,
  return: TokenType.RETURN
}
