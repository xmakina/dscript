import { DScriptCallable } from './DScriptCallable'

export type DScriptObject =
| DScriptCallable
| DScriptObject[]
| string
| number
| boolean
| null
