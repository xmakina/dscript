import { IInterpreter } from '../Interpreter'
import { InputStmt } from '../../AST'

export default (interpreter: IInterpreter) => async (stmt: InputStmt): Promise<void> => {
  const name = stmt.name
  const prompt = (await interpreter.evaluate(stmt.prompt))?.toString() ?? ''
  let value: string | number = await interpreter.output.prompt(prompt)
  if (!isNaN(Number.parseFloat(value))) {
    value = Number.parseFloat(value)
  }

  interpreter.environment.define(name.lexeme, value)
}
