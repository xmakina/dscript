import DScript from '../../DScript'
import MockOutput from '../../Utils/MockOutput'

describe('with scoping script', () => {
  const script = `
LET a = "global"
DEF run()
  DEF showA()
    PRINT a
  DEND

  showA()
  LET a = "block"
  showA()
DEND

run()
    `

  test('the output prints correctly', async () => {
    const subject = new DScript(MockOutput, script)
    await subject.run()
    expect(MockOutput.error).not.toBeCalled()
    expect(MockOutput.print).nthCalledWith(1, 'global')
    expect(MockOutput.print).nthCalledWith(2, 'global')
  })
})
