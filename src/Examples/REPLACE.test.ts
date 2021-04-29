import DScript from '../DScript'
import MockOutput from '../Utils/MockOutput'

const script = `
PRINT "Hello world!"
REPLACE "Howdy friend!"
`

describe('with an append script', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const subject = new DScript(MockOutput, script)

  test('the console is printed to', async () => {
    await subject.run()
    expect(MockOutput.print).lastCalledWith('Hello world!')
    expect(MockOutput.replace).lastCalledWith('Howdy friend!')
  })
})
