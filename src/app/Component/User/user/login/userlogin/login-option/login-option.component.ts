import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-option',
  templateUrl: './login-option.component.html',
  styleUrls: ['./login-option.component.scss']
})
export class LoginOptionComponent {
  constructor(private router: Router) { }
  GotoUserLogin(){
    this.router.navigate(['/UserLogin']) ;
  }
}
