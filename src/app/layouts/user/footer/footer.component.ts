import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: [
    './footer.component.scss',
    './../../../../assets/css/bootstrap.css',
    './../../../../assets/css/responsive.css',
    './../../../../assets/css/style.css',
    './../../../../assets/css/style.scss'
  ]
})
export class FooterComponent {
}
