import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {EndpointConfiguration, Protocol} from "../../utilities/models/DataAndConfigurationModel";
import {ConfigService} from "../config.service";

@Component({
  selector: 'app-endpoint-configuration',
  templateUrl: './endpoint-configuration.component.html',
  styleUrl: './endpoint-configuration.component.scss'
})
export class EndpointConfigurationComponent {
  endpointConfigurationForm: FormGroup = new FormGroup({
    schedule: new FormControl<string>('10000'),
    protocol: new FormControl<string>(Protocol.HTTP),
  });

  constructor(configService: ConfigService) {
    this.endpointConfigurationForm.valueChanges.subscribe((value) => {
      configService.endpointConfiguration$.next( value as EndpointConfiguration)
    })
  }


  getProtocols(){
    // @ts-ignore
    return Object.keys(Protocol).map(k => ({key: k, value: Protocol[k]}));
  }

}
