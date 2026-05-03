export interface JsonProperty {
  path:string,
  type:string
}

export interface JsonProperties {
  properties:JsonProperty[]
}


export interface FlattenOptions {
  delimiter?: string;
}
