import DScript from '../DScript'
import MockOutput from '../Utils/MockOutput'

const script = `
LET X = 1
PRINT X
SET X = 2
PRINT X
SET X = X + 2
PRINT X
`

describe('with variable example script', () => {
  beforeEach(async () => {
    jest.clearAllMocks()
    const subject: DScript = new DScript(MockOutput, script)
    await subject.run()
  })

  test('no errors occur', () => {
    expect(MockOutput.error).not.toHaveBeenCalled()
  })

  test('the code prints the correct values', () => {
    expect(MockOutput.print).toHaveBeenNthCalledWith(1, '1')
    expect(MockOutput.print).toHaveBeenNthCalledWith(2, '2')
    expect(MockOutput.print).toHaveBeenNthCalledWith(3, '4')
  })
})
