import Parser from '../Parser'
import Scanner from '../Scanner'
import MockInterpreter from '../Utils/MockInterpreter'
import { Resolver } from './Resolver'

describe('with resolver', () => {
  const resolver = new Resolver(MockInterpreter, jest.fn())

  describe('when resolving complex', () => {
    const source = `
        LET a = "global"
        DEF run()
          DEF showA()
            PRINT a
          DEND
        
          showA()
          LET a = "block"
          showA()
        DEND
        
        run()`

    beforeEach(() => {
      const tokens = new Scanner(source).ScanTokens()
      const statements = new Parser(jest.fn(), tokens).parse()
      resolver.resolve(statements)
    })

    test('foo distance is set once', () => {
      expect(MockInterpreter.resolve).toBeCalledTimes(2)
      expect(MockInterpreter.resolve).toHaveBeenNthCalledWith(1, expect.objectContaining({
        name: expect.objectContaining({ lexeme: 'showA', line: 8 })
      }), 0)
      expect(MockInterpreter.resolve).toHaveBeenNthCalledWith(2, expect.objectContaining({
        name: expect.objectContaining({ lexeme: 'showA', line: 10 })
      }), 0)
    })
  })
})
