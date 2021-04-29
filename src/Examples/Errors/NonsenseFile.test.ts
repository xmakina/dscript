import DScript from '../../DScript'
import MockOutput from '../../Utils/MockOutput'

describe('with a nonsence file', () => {
  const subject = new DScript(MockOutput, 'wizzbang')

  test('the error is reported', async () => {
    await subject.run()
    expect(MockOutput.error).nthCalledWith(1, "[RuntimeError (line 1, near wizzbang)] Cannot get undefined variable 'wizzbang'.")
    expect(MockOutput.error).toHaveBeenCalledTimes(2)
  })
})
