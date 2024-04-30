import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSign } from '../Model/userSignin.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private route:Router ) { }
  UserSignUp(data:UserSign){
    return this.http.post('http://localhost:3000/User',data , {observe:'response'})
    .subscribe((res)=>{
      if(res){
        localStorage.setItem('user',JSON.stringify(res.body));
        this.route.navigate(['/'])
      }
    })
  }
}
