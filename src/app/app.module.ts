import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiemgeniusConfigurationComponent } from './siemgenius-configuration/siemgenius-configuration.component';
import { SampleDataComponent } from './siemgenius-configuration/sample-data/sample-data.component';
import { MetaDataComponent } from './siemgenius-configuration/meta-data/meta-data.component';
import { EndpointConfigurationComponent } from './siemgenius-configuration/endpoint-configuration/endpoint-configuration.component';
import { HeaderComponent } from './header/header.component';
import { PanelModule } from "primeng/panel";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputTextareaModule } from "primeng/inputtextarea";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { RadioButtonModule } from "primeng/radiobutton";
import { InputNumberModule } from "primeng/inputnumber";
import { NgOptimizedImage } from "@angular/common";
import { TableModule } from 'primeng/table';
import { ScrollerModule } from 'primeng/scroller';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import {HttpClientModule} from "@angular/common/http";
import { LoadingDialogComponent } from './loading-dialog/loading-dialog.component';
import {DialogService} from "primeng/dynamicdialog";
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
@NgModule({
  declarations: [
    AppComponent,
    SiemgeniusConfigurationComponent,
    SampleDataComponent,
    MetaDataComponent,
    EndpointConfigurationComponent,
    HeaderComponent,
    LoadingDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PanelModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextareaModule,
    ButtonModule,
    RippleModule,
    RadioButtonModule,
    InputNumberModule,
    NgOptimizedImage,
    TableModule,
    ScrollerModule,
    DropdownModule,
    TooltipModule,
    HttpClientModule,
    ToastModule,
    InputTextModule
  ],
  providers: [{
    provide: Window,
    useValue: window
  },
    DialogService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
