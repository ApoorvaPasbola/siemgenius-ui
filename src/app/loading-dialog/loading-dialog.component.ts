import { Component} from '@angular/core';
import {DynamicDialogConfig} from "primeng/dynamicdialog";
@Component({
  selector: 'app-loading-dialog',
  templateUrl: './loading-dialog.component.html',
  styleUrl: './loading-dialog.component.scss'
})
export class LoadingDialogComponent {
  constructor(public dynamicConfigData: DynamicDialogConfig) {
  }

}
