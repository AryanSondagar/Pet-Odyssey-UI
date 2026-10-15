import { Component, OnInit } from '@angular/core';
import { ThemeService } from './core/services/theme.service';
import { UserService } from './core/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private themeService: ThemeService, private userService: UserService) { }
  title = 'Pet-Odyssey-UI';

  ngOnInit(): void {
    this.themeService.initializeTheme();
    this.userService.restoreSession().subscribe({
      error: (error) => console.error('Unable to restore authentication session:', error)
    });
  }
}
