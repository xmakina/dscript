import { IOutput } from '../DScript'

const MockOutput: IOutput = {
  print: jest.fn(),
  append: jest.fn(),
  error: jest.fn(),
  replace: jest.fn(),
  prompt: jest.fn().mockRejectedValue(new Error('No Promise Setup'))
}

export default MockOutput
