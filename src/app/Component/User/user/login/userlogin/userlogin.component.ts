import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { UserSign } from 'src/app/Model/userSignin.model';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.scss'],
})
export class UserloginComponent {
  passwordValue: string = '';
    email = faEnvelope ;
    lock = faLock;
    user = faUser 
  constructor(private User: UserService , private route:Router) {
  }
  SignUp(data: UserSign):void{
    this.User.UserSignUp(data);
  }
  Login(data: any){
     console.log(data);
  }
}
