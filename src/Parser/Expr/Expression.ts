import Parser from '..'
import { Expr } from '../../AST'
import Or from './Or'

export default (parser: Parser): Expr => {
  return Or(parser)
}
