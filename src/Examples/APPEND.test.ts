import DScript from '../DScript'
import MockOutput from '../Utils/MockOutput'

const script = `
PRINT "Hello"
APPEND " world!"
`

describe('with an append script', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const subject = new DScript(MockOutput, script)

  test('the console is printed to', async () => {
    await subject.run()
    expect(MockOutput.error).not.toHaveBeenCalled()
    expect(MockOutput.print).lastCalledWith('Hello')
    expect(MockOutput.append).lastCalledWith(' world!')
  })
})
