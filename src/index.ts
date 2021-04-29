import { readFileSync } from 'fs'
import DScript, { IOutput } from './DScript'
import * as readline from 'readline'

const output: IOutput = {
  replace: console.log,
  print: console.log,
  append: console.log,
  error: console.error,
  prompt: async (message: string): Promise<string> => {
    const rl = readline.createInterface(process.stdin, process.stdout)
    rl.setPrompt(message.trim() + '> ')
    rl.prompt()
    return await new Promise((resolve) => {
      rl.on('line', (line) => {
        rl.close()
        return resolve(line)
      })
    })
  }
}

const path = process.argv[2]
const file = readFileSync(path)
const runner = new DScript(output, file.toString())
runner.run().then(
  text => {
    console.log(text)
  },
  err => {
    console.error(err)
  }
)
