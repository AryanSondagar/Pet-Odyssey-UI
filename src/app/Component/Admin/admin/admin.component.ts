import { ChangeDetectorRef, Component,ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { OpenDialogComponent } from '../../open-dialog/open-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/Services/user.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  backgroundColor: string = 'white';
  isBackgroundColorBlue: boolean = false;
    buttonClicked = false;
  constructor(private observer: BreakpointObserver , private cd: ChangeDetectorRef ,private dialog: MatDialog , private userservice: UserService) {}

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
    this.cd.detectChanges();
  }
  changeBackgroundColor() {
    //  this.backgroundColor = this.backgroundColor === 'white' ? ' #636363' : 'white';
    this.isBackgroundColorBlue = !this.isBackgroundColorBlue;
    this.backgroundColor = this.isBackgroundColorBlue ? ' #636363 ' : 'white';
  }
   openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
      this.dialog.open(OpenDialogComponent, {
        width: '255px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
      this.userservice.buttonClicked$.subscribe((clicked) => {
        this.buttonClicked = clicked;
       
      });
  
    }
}
