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
  isAdminLogined = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false)
  private buttonClickedSource = new Subject<boolean>();
  buttonClicked$ = this.buttonClickedSource.asObservable();

  constructor(private http: HttpClient, private route: Router) { }
  UserSignUp(data: UserSign) {
    data.role = 'User';
    return this.http.post('http://localhost:3000/accounts', data, { observe: 'response' })
      .subscribe((res) => {
        if (res && res.body) {

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

  RoleBasedLogin(email: string, password: string, role: 'User' | 'Admin') {
  this.http
    .get<any[]>(`http://localhost:3000/accounts?email=${email}&password=${password}`, { observe: 'response' })
    .subscribe((result: any) => {
      console.log(result);

      if (result && result.body && result.body.length === 1) {
        this.isLoginError.emit(false);

        const user = result.body[0];
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('role', user.role);

        // ✅ set BehaviorSubject based on role
        if (user.role === 'User') {
          this.isUserLogined.next(true);
        } else if (role === 'Admin') {
          this.isAdminLogined.next(true);
        }

        // Navigate role-wise
        if (user.role === 'Admin') {
          this.route.navigate(['/admin']);
        } else {
          this.route.navigate(['/']);
        }
      } else {
        this.isLoginError.emit(true);

        if (role === 'User') {
          this.isUserLogined.next(false);
        } else if (role === 'Admin') {
          this.isAdminLogined.next(false);
        }

        console.log('Login failed');
      }
    });
}

  // UserLogin(data: UserLogin) {
  //   this.http.get(`http://localhost:3000/User?UserEmail=${data.UserEmail}&UserPassword=${data.UserPassword}`, { observe: 'response' })
  //     .subscribe((result: any) => {
  //       console.log(result);
  //       if (result && result.body && result.body?.length === 1) {
  //         this.isLoginError.emit(false);
  //         localStorage.setItem('user', JSON.stringify(result.body));
  //         this.isUserLogined.next(true)
  //         this.route.navigate(['/'])
  //       }
  //       else {
  //         this.isLoginError.emit(true);
  //         this.isUserLogined.next(false)
  //         console.log("login failed")
  //       }
  //     })
  // }
  clickButton(clicked: boolean) {
    this.buttonClickedSource.next(clicked);
  }
  // AdminLogin(data: AdminLogin) {
  //   this.http.get(`http://localhost:3000/Admin?AdminEmail=${data.AdminEmail}&AdminPassword=${data.AdminPassword}`, { observe: 'response' })
  //     .subscribe((result: any) => {
  //       if (result) {
  //         console.log(result);
  //       }
  //     })
  // }
}
