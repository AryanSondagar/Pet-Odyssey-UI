import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { UserService } from './Services/user.service';


@Injectable({
  providedIn: 'root'
})
export class authGuard {
  constructor(private UserService: UserService, private route: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.UserService.restoreSession().pipe(
      map((isAuthenticated) => {
        const allowedRoles = route.data['roles'] as string[] | undefined;
        const role = this.UserService.getCurrentRole();
        return isAuthenticated && (!allowedRoles || allowedRoles.includes(role || ''))
          ? true
          : this.route.parseUrl('/');
      }),
      catchError((error) => {
        console.error('Unable to restore authentication session:', error);
        return of(this.route.parseUrl('/'));
      })
    );
  }

}
