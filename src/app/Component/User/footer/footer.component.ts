import { Component } from '@angular/core';
import { faLock, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FontAwesomeModule],
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
   fb = faFacebook;
     phone = faPhone;
     email = faEnvelope;
}
