import DScript from '../../DScript'
import MockOutput from '../../Utils/MockOutput'

describe('with a bad function', () => {
  const source = `
    DEF bad()
      LET a = "first"
      LET a = "second"
    DEND
    `
  test('the error is caught', async () => {
    const subject = new DScript(MockOutput, source)
    await subject.run()
    expect(MockOutput.error).nthCalledWith(1, '[ResolvingError (line 4, near a)] Already variable with this name in this scope.')
    expect(MockOutput.error).toHaveBeenCalledTimes(2)
  })
})
