import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { UserLogin, UserSign } from 'src/app/Model/userSignin.model';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.scss'],
})
export class UserloginComponent {
  passwordValue: string = '';
  emailValue: string = '';
  nameValue: string = '';
  faEnvelope = faEnvelope;
  lock = faLock;
  user = faUser;
  authError: String = ''
  constructor(private User: UserService, private route: Router) {
  }
  ngOnInit(): void {
    this.User.RealoadUser();
  }
  SignUp(data: UserSign): void {
    console.log(data);
      data.role = 'User';
    this.User.UserSignUp(data);
  }
  Login(email: string, password: string, role: 'user' | 'admin') {
    console.log(email, password, role);
    this.User.RoleBasedLogin(email, password);
    this.User.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = "Email or password is not correct"
      }
    })
  }
}
