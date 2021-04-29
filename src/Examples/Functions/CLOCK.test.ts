import DScript from '../../DScript'
import MockOutput from '../../Utils/MockOutput'

const script = `
PRINT CLOCK()
`

describe('with a clock function', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const subject = new DScript(MockOutput, script)

  test('the console is printed to', async () => {
    await subject.run()
    expect(MockOutput.print).toBeCalledWith(expect.stringContaining('.'))
  })
})
