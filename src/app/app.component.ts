import { Component,ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Pet-Odyssey-UI';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  backgroundColor: string = 'white';
  isBackgroundColorBlue: boolean = false;
  constructor(private observer: BreakpointObserver) {}

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 600px)']).subscribe((result) => {
      if (result.matches) {
        this.sidenav.mode = 'over';

        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }
  changeBackgroundColor() {
    //  this.backgroundColor = this.backgroundColor === 'white' ? ' #636363' : 'white';
    this.isBackgroundColorBlue = !this.isBackgroundColorBlue;
    this.backgroundColor = this.isBackgroundColorBlue ? ' #636363 ' : 'white';
  }
}
