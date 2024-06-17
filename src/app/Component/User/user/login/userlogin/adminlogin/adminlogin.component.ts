import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.scss']
})
export class AdminloginComponent {
  email = faEnvelope ;
  lock = faLock;
  useremail: string = '';
  password: string = '';
  errorMessage: string = '';
    
  constructor(private http:HttpClient , private router: Router){}
  adminLogin(data: any){
    this.http.get<any>(`http://localhost:3000/Adimn?useremail=${this.useremail}&password=${this.password}`)
    .subscribe((users)=>{
      console.log(users);
      if (users.length) {
        const user = users[0];
        this.router.navigate(['/admin'])
      }else{

      }
    })
  }
}
