import { IEnvironment } from '../Environment'

const MockEnvironment: IEnvironment = {
  get: jest.fn(),
  getAt: jest.fn(),
  assign: jest.fn(),
  assignAt: jest.fn(),
  define: jest.fn()
}

export default MockEnvironment
