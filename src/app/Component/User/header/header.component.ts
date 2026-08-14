import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { OpenDialogComponent } from '../../open-dialog/open-dialog.component';
import { faLock, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { CommonModule } from '@angular/common';
import { ThemeService } from 'src/app/Services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.scss',
    './../../../../assets/css/bootstrap.css',
    './../../../../assets/css/responsive.css',
    './../../../../assets/css/style.css',
    './../../../../assets/css/style.scss'
  ]
  
})
export class HeaderComponent {
  userName: string = "";
  menutype: string = 'defult';
  buttonClicked = false;
  isDarkTheme = false;
  modeDropdownOpen = false;

  constructor(private dialog: MatDialog,
    private route: Router,
    private userservice: UserService,
    private themeService: ThemeService) {
    if (localStorage.getItem('user')) {
      this.menutype = 'user';
    } else {
      this.menutype = 'defult';
    }
    this.isDarkTheme = this.themeService.isDarkTheme();
  }
  ngOnInit(): void {
    this.userservice.isUserLogined.subscribe(x => {
      if (x) {
        if (localStorage.getItem('user')) {
          this.menutype = 'user';
        } else {
          this.menutype = 'defult';
        }
      }
    });

    this.themeService.darkTheme$.subscribe((isDarkTheme) => {
      this.isDarkTheme = isDarkTheme;
    });
  }
  login() {
    this.route.navigate(['UserLogin']);
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(OpenDialogComponent, {
      width: '255px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    this.userservice.buttonClicked$.subscribe((clicked) => {
      this.buttonClicked = clicked;
      if (this.buttonClicked == true) {
        this.menutype = 'defult'
      }
    });

  }

  toggleModeDropdown(): void {
    this.modeDropdownOpen = !this.modeDropdownOpen;
  }

  setThemeMode(mode: 'light' | 'dark'): void {
    this.themeService.setThemeMode(mode);
    this.modeDropdownOpen = false;
  }

}
