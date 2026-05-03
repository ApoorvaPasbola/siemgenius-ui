import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import {ConfigService} from "../config.service";
import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {debounceTime, filter} from "rxjs";

@Component({
  selector: 'app-sample-data',
  templateUrl: './sample-data.component.html',
  styleUrl: './sample-data.component.scss'
})
export class SampleDataComponent implements OnInit {
  ngOnInit(): void {
      if(this.sampleDataInput.value != null){
        this.sampleDataUpdatedEvent.emit("{}")
  }
  }

  @Output() sampleDataUpdatedEvent = new EventEmitter<string>();

  public sampleDataInput: FormControl = new FormControl<string>(
    JSON.stringify(this.configService.sampleData$.value,null,4),
    [this.jsonValidator()]
  );

  constructor(private configService:ConfigService, private changeDetectorCycle:ChangeDetectorRef) {
    this.sampleDataInput.valueChanges.pipe(debounceTime(1000),filter(value => this.isJsonString(value))).subscribe(value => {
      this.configService.sampleData$.next(JSON.parse(value))
    })

  }

  jsonValidator():ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let res = this.isJsonString(control.value)
      return res ? null : { inValidJsonError: "Invalid Json" } ;
    };
  }

  isJsonString(str:string) {
    try {
      let json = JSON.parse(str);
      return (typeof json === 'object');
    } catch (e) {
      return false;
    }
  }

  sampleDataUpdated() {
    this.sampleDataInput.patchValue(JSON.stringify(JSON.parse(this.sampleDataInput.value),null,4),{emitEvent:false});
    this.changeDetectorCycle.detectChanges();
    this.configService.sampleData$.next(JSON.parse(this.sampleDataInput.value))
    this.sampleDataUpdatedEvent.emit("Json Updated")
  }
}
