import DScript from '../DScript'
import MockOutput from '../Utils/MockOutput'

const arrayScript = `
DIM col
FOR X = 0 TO 3
DIM row
FOR Y = 0 TO 3
SET row[Y] = (X + 1) * (Y + 1)
NEXT Y
SET col[X] = row
NEXT X

FOR X = 0 TO 3
FOR Y = 0 TO 3
LET row = col[X]
PRINT row[Y]
NEXT Y
NEXT X
`

describe('with a single dimension array', () => {
  beforeEach(async () => {
    jest.clearAllMocks()
    const runner: DScript = new DScript(MockOutput, arrayScript)
    await runner.run()
  })

  test('the code prints the correct values', () => {
    expect(MockOutput.error).not.toHaveBeenCalled()
    expect(MockOutput.print).toHaveBeenNthCalledWith(1, '1')
    expect(MockOutput.print).toHaveBeenNthCalledWith(2, '2')
    expect(MockOutput.print).toHaveBeenNthCalledWith(3, '3')

    expect(MockOutput.print).toHaveBeenNthCalledWith(4, '2')
    expect(MockOutput.print).toHaveBeenNthCalledWith(5, '4')
    expect(MockOutput.print).toHaveBeenNthCalledWith(6, '6')

    expect(MockOutput.print).toHaveBeenNthCalledWith(7, '3')
    expect(MockOutput.print).toHaveBeenNthCalledWith(8, '6')
    expect(MockOutput.print).toHaveBeenNthCalledWith(9, '9')
  })
})
