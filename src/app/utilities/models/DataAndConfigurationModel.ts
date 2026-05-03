export interface DataAndConfiguration {
  metadata: MetaData,
  sampleData: JSON,
  endpointConfiguration: EndpointConfiguration
}

export interface MetaData {
  totalObjectCount: number,
  batchCount: number
  customizations: Customization[]
}

export interface EndpointConfiguration {
  protocol: string,
  schedule: string
}

export enum Protocol {
  HTTP = "http", KAFKA = "kafka"
}

export interface Customization {
  path: string,
  fixed: boolean,
  formula: Formula,
  arguments?: Arguments
}

export interface Arguments {
  offset?: number,
  range?: number[],
  list?: string[],
  latencySeconds?: number
  format?: string,
  expression?: string,
  boolean?: boolean,
  promptKey?:string,
  count?:number
}


export interface IndexParams {
  offset: number
}


export interface RangeArguments {
  range: number[]
}

export interface EnumParams {
  list: string[]
}

export interface CurrentTimeParams {
  latencySeconds: number,
  format: string
}

export interface ExpressionParams {
  expression: string
}

export interface GenAiParams {
  promptKey:string,
  count:number
}

export enum ArgumentsEnum {
  IndexParams = "IndexParams",
  EnumUniqueParams = "EnumUniqueParams",
  RangeParams = "RangeParams",
  EnumParams = "EnumParams",
  CurrentTimeParams = "CurrentTimeParams",
  ExpressionParams = "ExpressionParams",
  BooleanParams = "BooleanParams",
  GenAiParams = "GenAiParams"
}

export enum Formula {
  INDEX = "INDEX",
  ENUM_UNIQUE = "ENUM_UNIQUE",
  RANGE = "RANGE",
  ENUM = "ENUM",
  CURRENT_TIME = "CURRENT_TIME",
  EXPRESSION = "EXPRESSION",
  BOOLEAN = "BOOLEAN",
  GENAI= "GENAI"
}
