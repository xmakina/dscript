import theoretically from 'jest-theories'
import MockInterpreter from '../../Utils/MockInterpreter'
import IsNumberFunction from './IsNumberFunction'

describe('with is string function', () => {
  const subject = new IsNumberFunction()
  const theories = [
    { input: 'hello', expected: false },
    { input: 1, expected: true },
    { input: '1', expected: false }
  ]

  theoretically('when given {input}, return {expected}', theories, async (theory) => {
    const result = await subject.call(MockInterpreter, [theory.input])
    expect(result).toEqual(theory.expected)
  })
})
