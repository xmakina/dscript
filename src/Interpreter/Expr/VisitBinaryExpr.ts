import { IInterpreter } from '../Interpreter'
import { BinaryExpr } from '../../AST'
import { Token } from '../../Scanner/Token'
import { DScriptObject, TokenType, RuntimeError } from '../../Types'

function checkNumberOperands (token: Token, left: DScriptObject, right: DScriptObject): void {
  if (typeof left === 'number' && typeof right === 'number') {
    return
  }

  throw new RuntimeError(token, 'Both operands must be numbers')
}

const isEqual = (a: DScriptObject, b: DScriptObject): boolean =>
  (a === null && b === null) ? true
    : a === null ? false
      : a === b

export default (interpreter: IInterpreter) => async (expr: BinaryExpr): Promise<DScriptObject> => {
  const left = await interpreter.evaluate(expr.left)
  const right = await interpreter.evaluate(expr.right)

  switch (expr.operator.type) {
    case TokenType.MINUS:
      checkNumberOperands(expr.operator, left, right)
      return (left as number) - (right as number)
    case TokenType.SLASH:
      checkNumberOperands(expr.operator, left, right)
      if (right === 0) {
        throw new RuntimeError(expr.operator, 'Attempted to divide by 0.')
      }
      return (left as number) / (right as number)
    case TokenType.STAR:
      checkNumberOperands(expr.operator, left, right)
      return (left as number) * (right as number)
    case TokenType.LESS:
      checkNumberOperands(expr.operator, left, right)
      return (left as number) < (right as number)
    case TokenType.LESS_EQUAL:
      checkNumberOperands(expr.operator, left, right)
      return (left as number) <= (right as number)
    case TokenType.GREATER:
      checkNumberOperands(expr.operator, left, right)
      return (left as number) > (right as number)
    case TokenType.GREATER_EQUAL:
      checkNumberOperands(expr.operator, left, right)
      return (left as number) >= (right as number)
    case TokenType.UNEQUAL:
      return !isEqual(left, right)
    case TokenType.EQUAL:
      return isEqual(left, right)
    case TokenType.PLUS:
      if (typeof left === 'string') {
        return left.concat(right?.toString() ?? '')
      }

      if (typeof right === 'string') {
        return (left?.toString() ?? '').concat(right)
      }

      if (typeof left === 'number' && typeof right === 'number') {
        return left + right
      }

      throw new RuntimeError(expr.operator, 'Operands must be two numbers or two strings.')
  }

  return null
}
