import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './Services/user.service';


@Injectable({
  providedIn: 'root'
})
export class authGuard {
  constructor(private UserService: UserService, private route: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = localStorage.getItem('user');
    const role = localStorage.getItem('role');
    if (!user) {
      return this.route.parseUrl('/'); // not logged in
    }
    const allowedRoles = route.data['roles'] as Array<string>;
    if (allowedRoles && allowedRoles.includes(role!)) {
      return true; // ✅ user has required role
    }
    return this.route.parseUrl('/');
  }

}
