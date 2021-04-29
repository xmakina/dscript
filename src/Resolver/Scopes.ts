
export class Scopes {
  getDistance (lexeme: string): number | null {
    for (let i = this.scopes.length - 1; i >= 0; i--) {
      if (this.scopes[i].includes(lexeme)) {
        return this.scopes.length - 1 - i
      }
    }

    return null
  }

  private readonly scopes: string[][] = []

  peek (): string[] {
    return this.scopes[this.scopes.length - 1]
  }

  isEmpty (): boolean {
    return this.scopes.length < 1
  }

  beginScope (): void {
    this.scopes.push([])
  }

  endScope (): void {
    this.scopes.pop()
  }
}
