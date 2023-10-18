import { Component, OnInit,ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title = 'practice';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  backgroundColor: string = 'white';
  isBackgroundColorBlue: boolean = false;
  constructor(private observer:BreakpointObserver) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

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
