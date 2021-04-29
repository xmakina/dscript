import DScript from '../DScript'
import MockOutput from '../Utils/MockOutput'

const script = `
LET X = 0
WHILE X < 3
    PRINT X
    SET X = X + 1
WEND
PRINT X
`

describe('with a WHILE loop', () => {
  const subject = new DScript(MockOutput, script)

  test('the console is printed to', async () => {
    await subject.run()
    expect(MockOutput.print).toHaveBeenNthCalledWith(1, '0')
    expect(MockOutput.print).toHaveBeenNthCalledWith(2, '1')
    expect(MockOutput.print).toHaveBeenNthCalledWith(3, '2')
    expect(MockOutput.print).toHaveBeenNthCalledWith(4, '3')
  })
})
