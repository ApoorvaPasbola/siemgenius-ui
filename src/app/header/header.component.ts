import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  private electron:any;
  constructor(private window:Window) {

    if ((<any>window)["electronAPI"]) {
      try {
        this.electron = (<any>window)["electronAPI"]
      } catch (e) {
        console.log("Error thrown")
      }
    } else {
      console.log('App not running inside Electron!', <any>window);
    }
  }
  handleMinimize() {
    this.electron.minimize();
  }

  handleMaximize() {
    this.electron.maximize();
  }

  handleClose() {
    this.electron.quit();
  }
}
