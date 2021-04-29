import DScript from '../../DScript'
import MockOutput from '../../Utils/MockOutput'

describe('with a top level return', () => {
  const subject = new DScript(MockOutput, 'RETURN "at top level"')

  test('the error is reported', async () => {
    await subject.run()
    expect(MockOutput.error).nthCalledWith(1, "[ResolvingError (line 1, near RETURN)] Can't return from top-level code.")
    expect(MockOutput.error).toHaveBeenCalledTimes(2)
  })
})
