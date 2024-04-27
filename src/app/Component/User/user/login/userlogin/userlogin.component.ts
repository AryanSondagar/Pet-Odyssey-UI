import { Component } from '@angular/core';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.scss'],
})
export class UserloginComponent {
    signUpButton: HTMLElement | null = document.getElementById('signUp');
    signInButton: HTMLElement | null = document.getElementById('signIn');
    container: HTMLElement | null = document.getElementById('container');
  constructor() {
    if (this.signUpButton && this.signInButton && this.container) {
      this.signUpButton.addEventListener('click', (container:any) => {
        container.classList.add('right-panel-active');
      });

      this.signInButton.addEventListener('click', (container:any) => {
        container.classList.remove("right-panel-active");
      });
    }
  }
}
