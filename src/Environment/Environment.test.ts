import { RuntimeError, TokenType } from '../Types'
import MockToken from '../Utils/MockToken'
import Environment from './Environment'

describe('with environment', () => {
  describe('when defining a variable', () => {
    test('the variable is set correctly', () => {
      const environment = new Environment()
      environment.define('foo', 'bar')
      const result = environment.get(MockToken(TokenType.IDENTIFIER, '', 'foo'))
      expect(result).toEqual('bar')
    })
  })

  describe('when fetching a nested variable', () => {
    test('it returns the parent variable', () => {
      const environment = new Environment()
      environment.define('foo', 'bar')
      const childEnvironment = new Environment(environment)
      const result = childEnvironment.get(MockToken(TokenType.IDENTIFIER, '', 'foo'))
      expect(result).toEqual('bar')
    })
  })

  describe('when setting a nested variable', () => {
    test('it sets the parent variable', () => {
      const environment = new Environment()
      environment.define('foo', '42')
      const childEnvironment = new Environment(environment)
      childEnvironment.assign(MockToken(TokenType.IDENTIFIER, '', 'foo'), 'bar')
      const result = childEnvironment.get(MockToken(TokenType.IDENTIFIER, '', 'foo'))
      expect(result).toEqual('bar')
    })
  })

  describe('when getting an undefined variable', () => {
    test('a runtime error occurs', () => {
      const environment = new Environment()
      expect(() => environment.get(MockToken(TokenType.IDENTIFIER, '', 'foo'))).toThrow(RuntimeError)
    })
  })
})
