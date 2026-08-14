import { Component, OnInit } from '@angular/core';
import { ThemeService } from './Services/theme.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private themeService: ThemeService) { }
  title = 'Pet-Odyssey-UI';

  ngOnInit(): void {
    this.themeService.initializeTheme();
  }
}
