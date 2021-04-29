import theoretically from 'jest-theories'
import { TokenType } from '../Types'
import Scanner from './Scanner'

describe('with scanner', () => {
  const theories = [
    { input: '\n', expected: TokenType.NEWLINE },
    { input: '\\', expected: TokenType.BACKSLASH },
    { input: '/', expected: TokenType.SLASH },
    { input: '>', expected: TokenType.GREATER },
    { input: '>=', expected: TokenType.GREATER_EQUAL },
    { input: '<', expected: TokenType.LESS },
    { input: '<=', expected: TokenType.LESS_EQUAL },
    { input: '<>', expected: TokenType.UNEQUAL },
    { input: '"Hello World"', expected: TokenType.STRING },
    { input: 'Hello', expected: TokenType.IDENTIFIER },
    { input: '_Hello', expected: TokenType.IDENTIFIER },
    { input: 'PRINT', expected: TokenType.PRINT },
    { input: 'print', expected: TokenType.PRINT }
  ]

  theoretically('the character {input} is correctly tokenised', theories, (theory) => {
    const tokens = (new Scanner(theory.input)).ScanTokens()
    expect(tokens[0].type).toEqual(theory.expected)
    expect(tokens.length).toEqual(3)
  })

  test('white space is ignored', () => {
    const tokens = (new Scanner(' ')).ScanTokens()
    expect(tokens[0].type).toEqual(TokenType.NEWLINE)
    expect(tokens.length).toEqual(2)
  })

  describe('with numbers', () => {
    const theories = [
      { input: '1', expected: 1 },
      { input: '12', expected: 12 },
      { input: '123', expected: 123 },
      { input: '123.4', expected: 123.4 }
    ]

    theoretically('the character {input} is correctly read as {expected}', theories, (theory) => {
      const tokens = (new Scanner(theory.input)).ScanTokens()
      expect(tokens[0].type).toEqual(TokenType.NUMBER)
      expect(tokens[0].literal).toEqual(theory.expected)
      expect(tokens.length).toEqual(3)
    })
  })
})
