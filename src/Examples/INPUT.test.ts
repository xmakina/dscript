import DScript from '../DScript'
import MockOutput from '../Utils/MockOutput'

const script = `
LET X = "bar"
INPUT X "What is X?"
PRINT X
`

describe('with variable example script', () => {
  let expectedPrompt: string

  beforeEach(async () => {
    jest.clearAllMocks()
    MockOutput.prompt = async (prompt: string): Promise<string> => {
      expectedPrompt = prompt
      const promise = new Promise<string>((resolve) => {
        setTimeout(() => resolve('flim'), 1000)
      })

      return promise
    }

    const subject: DScript = new DScript(MockOutput, script)
    await subject.run()
  })

  test('no errors occur', () => {
    expect(MockOutput.error).not.toHaveBeenCalled()
  })

  test('the code prints the correct values', () => {
    expect(expectedPrompt).toEqual('What is X?')
    expect(MockOutput.print).toHaveBeenCalledWith('flim')
  })
})
