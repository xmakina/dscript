import { IInterpreter } from '../Interpreter'
import MockEnvironment from './MockEnvironment'
import MockOutput from './MockOutput'

const MockInterpreter: IInterpreter = {
  globals: MockEnvironment,
  environment: MockEnvironment,
  output: MockOutput,
  locals: new Map(),
  resolve: jest.fn(),
  interpret: jest.fn(),
  evaluate: jest.fn(),
  execute: jest.fn(),
  executeBlock: jest.fn(),
  visitBinaryExpr: jest.fn(),
  visitGroupingExpr: jest.fn(),
  visitLiteralExpr: jest.fn(),
  visitUnaryExpr: jest.fn(),
  visitCallExpr: jest.fn(),
  visitLogicalExpr: jest.fn(),
  visitArrayVariableExpr: jest.fn(),
  visitVariableExpr: jest.fn(),
  visitBlockStmt: jest.fn(),
  visitExpressionStmt: jest.fn(),
  visitIfStmt: jest.fn(),
  visitPrintStmt: jest.fn(),
  visitAppendStmt: jest.fn(),
  visitReplaceStmt: jest.fn(),
  visitDimStmt: jest.fn(),
  visitLetStmt: jest.fn(),
  visitSetStmt: jest.fn(),
  visitSetArrayStmt: jest.fn(),
  visitWhileStmt: jest.fn(),
  visitInputStmt: jest.fn(),
  visitFunctionStmt: jest.fn(),
  visitReturnStmt: jest.fn(),
  visitAssignExpr: jest.fn(),
  visitArrayAssignExpr: jest.fn(),
  lookUpVariable: jest.fn()
}

export default MockInterpreter
