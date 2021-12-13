export type Ref = string
export type File = string
export type Src = string

export interface ParseOptions {
  input: string
}

export interface JsonSchema {
  type: string
  definitions: Definitions
  properties: Properties
}

export interface Definitions {
  [key: string]: Prop
}

export interface Properties {
  [key: string]: Prop
}

export interface RefObject {
  $ref: Ref
}

export interface Addon {
  allOf: Prop[]
  oneOf: Prop[]
  anyOf: Prop[]
  not: Prop,
  readOnly: boolean
}

export interface Items {
  items: Prop
}

export interface Prop extends RefObject, Items, JsonSchema, Addon {}