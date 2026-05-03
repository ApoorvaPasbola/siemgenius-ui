import {FlattenOptions, JsonProperties, JsonProperty} from "./models/MetadataProperties";
import {
  Arguments,
  ArgumentsEnum,
  CurrentTimeParams,
  EnumParams,
  ExpressionParams,
  Formula, GenAiParams, IndexParams, RangeArguments
} from "./models/DataAndConfigurationModel";

export class Utilities {
  public static  CORESERVICEBASEURL = "http://localhost:8080/api/v1/configuration"
  public static  OpenAiBASEURL = "http://localhost:8080/api/v1/openAi/smartData"


  public static flattenObject(obj: Record<string, any>, options: FlattenOptions = {}): Record<string, any> {
    const {delimiter = '.'} = options;

    const result: Record<string, any> = {};

    function recurse(current: Record<string, any>, path: string[] = []): void {
      for (const key in current) {
        const value = current[key];

        const newPath = [...path, key];

        if (value && typeof value === 'object' && !Array.isArray(value)) {
          recurse(value, newPath);
        } else {
          result[newPath.join(delimiter)] = value;
        }
      }
    }

    recurse(obj);

    return result;
  }


  public static getPropertiesWithType(properties: Record<string, any>): JsonProperties {
    let jsonProperties: JsonProperty[] = [];
    for (const key in properties) {
      jsonProperties.push({
        path: key,
        type: this.getParamsTypeFromValue(key, properties[key])
      })
    }


    return {
      properties: jsonProperties
    } as JsonProperties;
  }

  private static getParamsTypeFromValue(key: string, value: any): ArgumentsEnum {
    switch (typeof value) {
      case "string":
        if (value.includes("id") || value.includes("index"))
          return ArgumentsEnum.IndexParams
        if( value.split("-")[0].match(/^\d/g) && value.split("-")[1].match(/^\d/g) && value.split("-")[2].match(/^\d/g)){
          return ArgumentsEnum.CurrentTimeParams;
        }
        return ArgumentsEnum.EnumParams
      case "number":
        return ArgumentsEnum.RangeParams
      case "boolean":
        return ArgumentsEnum.BooleanParams
      default:
        return ArgumentsEnum.GenAiParams
    }
  }

  public static getFormulaFromType(argsType: ArgumentsEnum): Formula {
    switch (argsType) {
      case ArgumentsEnum.EnumParams:
        return Formula.ENUM
      case ArgumentsEnum.CurrentTimeParams:
        return Formula.CURRENT_TIME
      case ArgumentsEnum.EnumUniqueParams:
        return Formula.ENUM_UNIQUE
      case ArgumentsEnum.BooleanParams:
        return Formula.BOOLEAN
      case ArgumentsEnum.ExpressionParams:
        return Formula.EXPRESSION
      case ArgumentsEnum.IndexParams:
        return Formula.INDEX
      case ArgumentsEnum.RangeParams:
        return Formula.RANGE
      default:
        return Formula.GENAI
    }
  }

  /*
    Returns the default value for each Formual which is set on the table based on the
    Type of sample data properties
   */
  public static getArgsForFormula(formula: Formula): Arguments {
    switch (formula) {
      case Formula.ENUM:
        return {list: ["value1", "value2", "value3", "value4", "value5"]} as EnumParams
      case Formula.CURRENT_TIME:
        return {latencySeconds: 10, format: "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"} as CurrentTimeParams
      case Formula.ENUM_UNIQUE:
        return {list: ["value1", "value2", "value3", "value4", "value5"]} as EnumParams
      case Formula.BOOLEAN:
        return {boolean: true}
      case Formula.EXPRESSION:
        return {expression: "'Global-' + [key-path]] + '-' + T(java.lang.Math).round(studentId)"} as ExpressionParams
      case Formula.INDEX:
        return {offset: 10} as IndexParams
      case Formula.RANGE:
        return {range: [10, 20]} as RangeArguments
      case Formula.GENAI:
        return {promptKey: "city", count: 5} as GenAiParams
    }
  }

}
