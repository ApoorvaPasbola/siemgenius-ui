import {Component, Input, OnInit} from '@angular/core';
import {expand} from "rxjs";
import {Customization} from "../../utilities/models/DataAndConfigurationModel";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {LoadingDialogComponent} from "../../loading-dialog/loading-dialog.component";
import {ConfigService} from "../config.service";
import { Utilities } from '../../utilities/Utilities';

@Component({
  selector: 'app-meta-data',
  templateUrl: './meta-data.component.html',
  styleUrl: './meta-data.component.scss'
})
export class MetaDataComponent implements OnInit{
  @Input() fixedValues: object[] = [];
  @Input() formulaValues: object[] = [];
  @Input() tableObjects: Customization[] = [];
  sizes!:any
  ref!: DynamicDialogRef;
  ngOnInit(){
    this.sizes = [
      { name: 'Small', class: 'p-datatable-sm' },
      { name: 'Normal', class: '' },
      { name: 'Large',  class: 'p-datatable-lg' }
    ];
  }

  constructor(public dialogService: DialogService, private configService:ConfigService) {}

  protected readonly expand = expand;

  callAI(index: any){
    this.ref = this.dialogService.open(LoadingDialogComponent, { header: 'AI At work', data:{index: Math.floor(Math.random()*10)%4}});
    this.configService.getSmartData(this.tableObjects[index].path).subscribe({
      next: (value)=>{
        // @ts-ignore
        this.tableObjects[index].arguments.list = value
        this.ref.close()
      }
    })
  }

  updateArg(ind: any){
    this.tableObjects[ind].arguments = Utilities.getArgsForFormula(this.tableObjects[ind].formula);
    let referenceObject = JSON.parse(JSON.stringify(this.tableObjects));
    this.tableObjects = referenceObject;
    this.configService.customization$.next(this.tableObjects)
  }

  fixListValues($event: Event,index:number) {
        this.tableObjects[index].arguments = {list: String(this.tableObjects[index].arguments?.list).split(",")}
  }
}
