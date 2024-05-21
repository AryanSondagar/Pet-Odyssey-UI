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
    email = faEnvelope ;
    lock = faLock;
    user = faUser ;
    authError : String=''
  constructor(private User: UserService , private route:Router) {
  }
  ngOnInit():void{
    this.User.RealoadUser();
  }
  SignUp(data: UserSign):void{
    console.log(data);
    this.User.UserSignUp(data);
  }
  Login(data: UserLogin){
     console.log(data);
     this.User.UserLogin(data);
     this.User.isLoginError.subscribe((isError)=>{
        if (isError) {
          this.authError="Email or password is not correct"
        }
     })
  }
}
