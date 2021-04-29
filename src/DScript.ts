import { AstPrinter } from './AST/AstPrinter'
import Environment from './Environment'
import Interpreter from './Interpreter/Interpreter'
import Parser from './Parser/Parser'
import { Resolver } from './Resolver/Resolver'
import Scanner from './Scanner'
import { DScriptError, RuntimeError, TokenError } from './Types'

export interface IOutput {
  replace: (content: string) => void
  print: (content: string) => void
  append: (content: string) => void
  error: (content: string) => void
  prompt: (message: string) => Promise<string>
}

export default class DScript {
  private static output: IOutput
  private readonly source: string
  private static hadError = false
  private static hadRuntimeError = false
  private readonly showPrinter: boolean

  constructor (output: IOutput, source: string, showPrinter = false) {
    DScript.output = output
    this.source = source
    this.showPrinter = showPrinter

    if (DScript.output === undefined) {
      throw new Error('Console Must Be Defined.')
    }
  }

  async run (): Promise<number> {
    const scanner = new Scanner(this.source)
    const tokens = scanner.ScanTokens()
    const parser = new Parser(this.report, tokens)
    const statements = parser.parse()

    if (DScript.hadError) {
      return 65
    }

    const interpreter = new Interpreter(DScript.output, this.report, new Environment())
    if (this.showPrinter) {
      console.log(new AstPrinter().stringify(statements))
    }

    const resolver = new Resolver(interpreter, this.report)
    resolver.resolve(statements)
    if (DScript.hadError) {
      return 66
    }

    await interpreter.interpret(statements)

    if (DScript.hadRuntimeError) {
      return 70
    }

    return 0
  }

  private report (error: DScriptError): void {
    if (error instanceof RuntimeError) {
      DScript.hadRuntimeError = true
    } else {
      DScript.hadError = true
    }

    if (error instanceof TokenError) {
      DScript.output.error(`[${error.constructor.name} (line ${error.line}, near ${error.token.lexeme})] ${error.message}`)
    } else {
      DScript.output.error(`[${error.constructor.name} (line ${error.line})] ${error.message}`)
    }

    if (error.stack !== undefined) {
      DScript.output.error(error.stack)
    }
  }
}
