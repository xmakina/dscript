import { Token } from '../Scanner/Token'
import { TokenType, DScriptObject } from '../Types'

export default (type: TokenType, literal: DScriptObject = null, lexeme?: string): Token => {
  const lexemeUsed =
   lexeme !== undefined ? lexeme
     : typeof literal === 'string' ? literal
       : ''

  return new Token(type, lexemeUsed, literal, 1)
}
