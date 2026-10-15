import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from '../Services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiUrl = environment.apiUrl.replace(/\/$/, '');
    if (!req.url.startsWith(apiUrl)) {
      return next.handle(req);
    }

    const credentialledRequest = req.clone({ withCredentials: true });
    const isAuthEndpoint = /\/api\/auth\/(login|register|refresh|logout)$/.test(req.url);
    const isMutation = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method);

    const request$ = isMutation
      ? this.userService.getCsrfToken().pipe(
          switchMap((csrfToken) => next.handle(
            credentialledRequest.clone({
              setHeaders: { 'X-CSRF-Token': csrfToken }
            })
          ))
        )
      : next.handle(credentialledRequest);

    return request$.pipe(
      catchError((error) => {
        if (error.status !== 401 || isAuthEndpoint) {
          return throwError(() => error);
        }

        return this.userService.refreshSession().pipe(
          switchMap(() => isMutation
            ? this.userService.getCsrfToken().pipe(
                switchMap((csrfToken) => next.handle(
                  credentialledRequest.clone({
                    setHeaders: { 'X-CSRF-Token': csrfToken }
                  })
                ))
              )
            : next.handle(credentialledRequest)
          ),
          catchError((refreshError) => {
            this.userService.clearLocalSession();
            return throwError(() => refreshError);
          })
        );
      })
    );
  }
}
