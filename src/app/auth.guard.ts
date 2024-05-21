import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './Services/user.service';


@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
  
  constructor(private UserService:UserService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (localStorage.getItem('user')) {
        return true;
      }
    return this.UserService.isUserLogin;
  }
  
}
