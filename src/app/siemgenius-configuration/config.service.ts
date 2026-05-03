import {Injectable} from '@angular/core';
import {
  Customization,
  DataAndConfiguration,
  EndpointConfiguration,
  MetaData,
} from "../utilities/models/DataAndConfigurationModel";
import {BehaviorSubject, map} from "rxjs";
import {Defaults} from "../utilities/Defaults";

import {Utilities} from "../utilities/Utilities";
import {JsonProperties} from "../utilities/models/MetadataProperties";
import {HttpClient, HttpParams} from "@angular/common/http";
import { MessageService } from 'primeng/api';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  metaData$: BehaviorSubject<MetaData> = new BehaviorSubject<MetaData>(Defaults.getMetaDataDefaults());
  sampleData$: BehaviorSubject<JSON> = new BehaviorSubject<JSON>(Defaults.getSampleDataDefaults());
  endpointConfiguration$: BehaviorSubject<EndpointConfiguration> = new BehaviorSubject<EndpointConfiguration>(Defaults.getEndpointConfigurationDefaults());
  customization$: BehaviorSubject<Customization[]> = new BehaviorSubject<Customization[]>(Defaults.getCustomizationsDefaults());
  dataAndConfigurations!: DataAndConfiguration
  flattenedJson!: Record<string, any>;

  constructor(private _http:HttpClient, private messageService: MessageService) {
    // Setting the defaults value as the starting point
    this.dataAndConfigurations = {
      metadata: this.metaData$.value,
      sampleData: this.sampleData$.value,
      endpointConfiguration: this.endpointConfiguration$.value
    }

    this.endpointConfiguration$.subscribe(value => {
      this.dataAndConfigurations = {...this.dataAndConfigurations, endpointConfiguration: value}
    })

    this.sampleData$.subscribe(value => {
      // Update the metaData Drop down menu for properties
      this.generateFlattenJson(value)
      this.dataAndConfigurations = {...this.dataAndConfigurations, sampleData: value}
    })

    this.customization$.subscribe(value => {
        this.metaData$.next({
          customizations: value,
          totalObjectCount: 5,
          batchCount: 5
        })
      this.dataAndConfigurations = {...this.dataAndConfigurations , metadata: {...this.metaData$.value, customizations: value}}
      })
  }

  private generateFlattenJson(json: JSON) {
    this.flattenedJson = Utilities.flattenObject(json)
  }

  getPropertiesWithType(): JsonProperties {
    return Utilities.getPropertiesWithType(this.flattenedJson);
  }

  configureCoreService(){
    this._http.put(Utilities.CORESERVICEBASEURL,this.dataAndConfigurations).subscribe(
      {
        error: ()=>{
          console.log("Error while configuring the simulator")
        },
        next: ()=>{
          console.log("Successfully configured the simulator",this.dataAndConfigurations);
          this.messageService.add({ key: 'bc', severity: 'success', summary: 'Success', detail: 'Configuration Done!' });
        },
        complete: ()=>{}
      }
    )
  }

  getSmartData(key:string, count:number = 5){
    return this._http.get<{[key:string]:string[]}>(Utilities.OpenAiBASEURL,{
      params:new HttpParams().set("key",key).set("count",count)
    })
      .pipe(map(value => value[Object.keys(value)[0]]))
  }


}
