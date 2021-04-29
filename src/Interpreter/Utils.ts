import { DScriptObject } from '../Types'

export const isTruthy = (object: DScriptObject): boolean =>
  object === null ? false
    : typeof object === 'boolean' ? object
      : true

export function Stringify (value: DScriptObject): string {
  if (value === null) return 'null'

  if (typeof value === 'number') {
    let text = value.toString()
    if (text.endsWith('.0')) text = text.substring(0, text.length - 2)
    return text
  }

  return value.toString()
}
