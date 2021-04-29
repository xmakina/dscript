import { BinaryExpr, BlockStmt, SetStmt, WhileStmt } from '../../AST'
import Scanner from '../../Scanner'
import { TokenType } from '../../Types'
import Parser from '../Parser'

describe('when parsing FOR statement', () => {
  describe('with any for statement', () => {
    const source = `FOR X = 1 TO 10
    NEXT X`

    test('the operator is unequal and the default step is +1', () => {
      const tokens = new Scanner(source).ScanTokens()
      const parser = new Parser(jest.fn(), tokens)
      const parseResult = parser.parse()
      expect(parseResult[0]).toBeInstanceOf(BlockStmt)
      const statements = (parseResult[0] as BlockStmt).statements
      expect(statements[1]).toBeInstanceOf(WhileStmt)
      const whileStmt = statements[1] as WhileStmt
      expect(whileStmt.condition).toBeInstanceOf(BinaryExpr)
      const binaryExpr = whileStmt.condition as BinaryExpr
      expect(binaryExpr.operator.type).toEqual(TokenType.UNEQUAL)
      expect(whileStmt.body).toBeInstanceOf(BlockStmt)
      const body = whileStmt.body as BlockStmt
      expect(body.statements[1]).toBeInstanceOf(SetStmt)
      const setStmt = body.statements[1] as SetStmt
      expect(setStmt.value).toBeInstanceOf(BinaryExpr)
      const increment = setStmt.value as BinaryExpr
      expect(increment.operator.type).toEqual(TokenType.PLUS)
    })
  })
})
