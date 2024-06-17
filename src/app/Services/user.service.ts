import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { AdminLogin, UserLogin, UserSign } from '../Model/userSignin.model';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isUserLogin = new BehaviorSubject<boolean>(false);
  isUserLogined = new BehaviorSubject<boolean>(false);
  isAdminLogin = new BehaviorSubject<boolean>(false);
  isAdminLogined  = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false)
  private buttonClickedSource = new Subject<boolean>();
  buttonClicked$ = this.buttonClickedSource.asObservable();

  constructor(private http: HttpClient, private route: Router) { }
  UserSignUp(data: UserSign) {
    return this.http.post('http://localhost:3000/User', data, { observe: 'response' })
      .subscribe((res) => {
        if (res) {

          localStorage.setItem('user', JSON.stringify(res.body));
          this.route.navigate(['/'])
        }
      })
  }
  RealoadUser() {
    if (localStorage.getItem('user')) {
     this.isUserLogin.next(true)
      this.route.navigate(['/'])
    }
  }
  UserLogin(data: UserLogin) {
    this.http.get(`http://localhost:3000/User?UserEmail=${data.UserEmail}&UserPassword=${data.UserPassword}`, { observe: 'response' })
      .subscribe((result: any) => {
         console.log(result);
        if (result && result.body && result.body?.length === 1) {
          this.isLoginError.emit(false);
          localStorage.setItem('user', JSON.stringify(result.body));
          this.isUserLogined.next(true)
          this.route.navigate(['/'])
        } 
        else {
          this.isLoginError.emit(true);
         this.isUserLogined.next(false)
          console.log("login failed")
        }
      })
  }
  clickButton(clicked: boolean) {
    this.buttonClickedSource.next(clicked);
  }
  AdminLogin(data:AdminLogin){
    this.http.get(`http://localhost:3000/Admin?AdminEmail=${data.AdminEmail}&AdminPassword=${data.AdminPassword}`, {observe: 'response'})
    .subscribe((result: any)=>{
      if (result) {
          console.log(result);
      }
    })
  }
}
