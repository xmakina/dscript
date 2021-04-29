import DScript from '../DScript'
import MockOutput from '../Utils/MockOutput'

const script = `
PRINT "Hello world!"

LET GREETING = "Hello"
LET AMOUNT = 2
LET TARGET = "worlds!"
PRINT GREETING + "! I see there are " + AMOUNT + " " + TARGET
`

describe('with a print script', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const subject = new DScript(MockOutput, script)

  test('the console is printed to', async () => {
    await subject.run()
    expect(MockOutput.print).toHaveBeenNthCalledWith(1, 'Hello world!')
    expect(MockOutput.print).toHaveBeenNthCalledWith(2, 'Hello! I see there are 2 worlds!')
  })
})
