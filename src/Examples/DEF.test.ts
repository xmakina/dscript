import DScript from '../DScript'
import MockOutput from '../Utils/MockOutput'

const script = `
LET target = "foobar"
DEF GREET(target)
  PRINT "Hello " + target + "!"
DEND

GREET("friends")
PRINT target

DEF SUM(a, b)
  RETURN a + b
DEND

PRINT SUM(2, 2)
`

describe('with a user defined function', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const subject = new DScript(MockOutput, script)

  test('the console is printed to', async () => {
    await subject.run()
    expect(MockOutput.error).not.toHaveBeenCalled()
    expect(MockOutput.print).toHaveBeenNthCalledWith(1, 'Hello friends!')
    expect(MockOutput.print).toHaveBeenNthCalledWith(2, 'foobar')
    expect(MockOutput.print).toHaveBeenNthCalledWith(3, '4')
  })
})
