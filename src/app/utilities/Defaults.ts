import {
  Customization,
  EndpointConfiguration,
  Formula,
  MetaData,
  Protocol,
  RangeArguments
} from "./models/DataAndConfigurationModel";

export class Defaults {
  public static getCustomizationsDefaults(): Customization[] {
    return [{
      path: "",
      fixed: true,
      formula: Formula.RANGE,
      arguments: {
        range: [
          10,
          20
        ]
      } as RangeArguments
    }] as Customization[];
  }

  public static getEndpointConfigurationDefaults(): EndpointConfiguration {
    return {
      protocol: Protocol.KAFKA,
      schedule: "10000"
    } as EndpointConfiguration
  }

  public static getSampleDataDefaults(): JSON {
    return JSON.parse('{"studentId":1,"universalId":"Global-Kevin-1","city":"Pune","studentName":"Kevin","branch":{"name":"Computer Science"},"mood":"Low","age":23,"last_updated":"2020-07-31T07:01:21.000Z"}');
  }

  public static getMetaDataDefaults(): MetaData {
    return {
      totalObjectCount: 5,
      batchCount: 5,
      customizations: this.getCustomizationsDefaults()
    } as MetaData;
  }
}


