import DScript from '../../DScript'
import MockOutput from '../../Utils/MockOutput'

describe('with a counter script', () => {
  const script = `
DEF makeCounter()
  LET i = 0
  DEF count()
    SET i = i + 1
    PRINT i
  DEND

  return count
DEND

LET counter = makeCounter()
counter()
counter()
    `

  test('the output prints correctly', async () => {
    const subject = new DScript(MockOutput, script)
    await subject.run()
    expect(MockOutput.error).not.toBeCalled()
    expect(MockOutput.print).nthCalledWith(1, '1')
    expect(MockOutput.print).nthCalledWith(2, '2')
  })
})
