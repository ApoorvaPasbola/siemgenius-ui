import { Component} from '@angular/core';
import {ConfigService} from './config.service';
import {
  ArgumentsEnum,
  Customization,
  Formula
} from "../utilities/models/DataAndConfigurationModel";
import {JsonProperties} from "../utilities/models/MetadataProperties";
import {Utilities} from "../utilities/Utilities";

@Component({
  selector: 'app-siemgenius-configuration',
  templateUrl: './siemgenius-configuration.component.html',
  styleUrl: './siemgenius-configuration.component.scss'
})
export class SiemgeniusConfigurationComponent {
  public fieldArray: JsonProperties = {properties: []};
  public fixedValues: object[] = [];
  public formulaValues: object[] = [];
  public tableObjects: Customization[] = [];
  public originalObject: string[] = [];

  constructor(
    public configService: ConfigService
  ) {
  }

  /*
    Sets the Meta Data Table and sets the default value of the table on init
   */
  updateMetaDataTable() {
    this.fieldArray = this.configService.getPropertiesWithType();
    this.originalObject = JSON.parse(JSON.stringify(this.fieldArray));
    if (this.fieldArray.properties.length > 0) {
      this.tableObjects = this.fieldArray.properties.map(element => {
        let formula = Utilities.getFormulaFromType(ArgumentsEnum[element.type as keyof typeof ArgumentsEnum]);
        let args = Utilities.getArgsForFormula(formula);
        return {
          path: element.path,
          fixed: false,
          formula: formula,
          arguments: args
        };
      });

      this.configService.customization$.next(this.tableObjects)
      this.fixedValues = [
        {label: 'True', value: true},
        {label: 'False', value: false},
      ]

      this.formulaValues = [
        {label: Formula.INDEX, value: Formula.INDEX},
        {label: Formula.ENUM_UNIQUE, value: Formula.ENUM_UNIQUE},
        {label: Formula.RANGE, value: Formula.RANGE},
        {label: Formula.ENUM, value: Formula.ENUM},
        {label: Formula.CURRENT_TIME, value: Formula.CURRENT_TIME},
        {label: Formula.EXPRESSION, value: Formula.EXPRESSION},
        {label: Formula.GENAI, value: Formula.GENAI},
        {label: Formula.BOOLEAN, value: Formula.BOOLEAN},
      ]
    }
  }

  public resetData() {
    this.fieldArray = {properties: []};
    this.formulaValues = [];
    this.fixedValues = [];
    this.tableObjects = [];
  }

  public submitData() {
    this.configService.configureCoreService();
  }
}
