import DScript from '../../DScript'
import MockOutput from '../../Utils/MockOutput'

const script = `
PRINT IS_NUMBER("Hello")
PRINT IS_NUMBER(123)
PRINT IS_NUMBER(-123)
`

describe('with a clock function', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const subject = new DScript(MockOutput, script)

  test('the console is printed to', async () => {
    await subject.run()
    expect(MockOutput.print).toBeCalledWith('false')
    expect(MockOutput.print).toBeCalledWith('true')
  })
})
