import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, catchError, finalize, map, of, shareReplay, tap, throwError } from 'rxjs';
import { UserSign } from '../Model/userSignin.model';
import { AlertService } from './alert.service';
import { environment } from 'src/environments/environment';

export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthResponse {
  user: AuthenticatedUser;
}

interface CsrfResponse {
  csrfToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isUserLogin = new BehaviorSubject<boolean>(false);
  isUserLogined = new BehaviorSubject<boolean>(false);
  isAdminLogin = new BehaviorSubject<boolean>(false);
  isAdminLogined = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  private buttonClickedSource = new Subject<boolean>();
  buttonClicked$ = this.buttonClickedSource.asObservable();
  private refreshRequest: Observable<AuthResponse> | null = null;
  private csrfTokenRequest: Observable<string> | null = null;
  private csrfToken: string | null = null;
  private sessionInitialized = false;
  private sessionAuthenticated = false;
  private readonly authUrl = `${environment.apiUrl}/api/auth`;

  constructor(
    private http: HttpClient,
    private route: Router,
    private alert: AlertService
  ) {}

  UserSignUp(data: UserSign): void {
    this.http.post<AuthResponse>(`${this.authUrl}/register`, data).subscribe({
      next: (result) => {
        this.setAuthenticatedUser(result.user);
        this.route.navigate(['/']);
      },
      error: (err) => {
        this.alert.ShowError(err.status === 409 ? 'User already exists' : 'Registration failed. Please try again.');
        console.error('Registration error:', err);
      }
    });
  }

  RealoadUser(): void {
    this.restoreSession().subscribe({
      next: (isAuthenticated) => {
        if (isAuthenticated) {
          this.route.navigate(['/']);
        }
      },
      error: (error) => console.error('Unable to restore authentication session:', error)
    });
  }

  RoleBasedLogin(email: string, password: string): void {
    if (!email || !password) {
      this.isLoginError.emit(true);
      this.alert.ShowError('Please enter both email and password');
      return;
    }

    this.http.post<AuthResponse>(`${this.authUrl}/login`, { email, password }).subscribe({
      next: (result) => {
        const user = result.user;
        this.setAuthenticatedUser(user);
        this.isLoginError.emit(false);
        this.alert.ShowSuccess('Login successful!');

        if (user.role === 'admin') {
          this.route.navigate(['/admin']);
        } else {
          this.route.navigate(['/']);
        }
      },
      error: (err) => {
        this.isLoginError.emit(true);
        if (err.status === 401) {
          this.alert.ShowError('Invalid email or password');
        } else if (err.status === 404) {
          this.alert.ShowError('User does not exist');
        } else {
          this.alert.ShowError('Login failed. Please try again.');
        }
        console.error('Login error:', err);
      }
    });
  }

  refreshSession(): Observable<AuthResponse> {
    if (!this.refreshRequest) {
      this.refreshRequest = this.http
        .post<AuthResponse>(`${this.authUrl}/refresh`, {})
        .pipe(
          tap((result) => this.setAuthenticatedUser(result.user)),
          finalize(() => {
            this.refreshRequest = null;
          }),
          shareReplay({ bufferSize: 1, refCount: false })
        );
    }
    return this.refreshRequest;
  }

  getCsrfToken(): Observable<string> {
    if (this.csrfToken) {
      return of(this.csrfToken);
    }

    if (!this.csrfTokenRequest) {
      this.csrfTokenRequest = this.http
        .get<CsrfResponse>(`${this.authUrl}/csrf`)
        .pipe(
          map((response) => response.csrfToken),
          tap((token) => {
            this.csrfToken = token;
          }),
          finalize(() => {
            this.csrfTokenRequest = null;
          }),
          shareReplay({ bufferSize: 1, refCount: false })
        );
    }
    return this.csrfTokenRequest;
  }

  restoreSession(): Observable<boolean> {
    if (this.sessionInitialized) {
      return of(this.sessionAuthenticated);
    }

    return this.refreshSession().pipe(
      map(() => {
        this.sessionInitialized = true;
        this.sessionAuthenticated = true;
        return true;
      }),
      catchError((err) => {
        if (err.status === 401) {
          this.clearLocalSession();
          return of(false);
        }
        return throwError(() => err);
      })
    );
  }

  logout(): Observable<void> {
    return this.http.post(`${this.authUrl}/logout`, {}).pipe(
      tap(() => this.clearLocalSession()),
      map(() => undefined)
    );
  }

  clearLocalSession(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.isUserLogin.next(false);
    this.isUserLogined.next(false);
    this.isAdminLogin.next(false);
    this.isAdminLogined.next(false);
    this.sessionInitialized = true;
    this.sessionAuthenticated = false;
    this.csrfToken = null;
  }

  clickButton(clicked: boolean): void {
    this.buttonClickedSource.next(clicked);
  }

  isUserLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  getCurrentRole(): string | null {
    return localStorage.getItem('role');
  }

  requireUserLogin(action: string): boolean {
    if (this.isUserLoggedIn()) {
      return true;
    }

    this.alert.ShowError(`Please login to ${action}.`);
    this.route.navigate(['/UserLogin']);
    return false;
  }

  private setAuthenticatedUser(user: AuthenticatedUser): void {
    localStorage.removeItem('token');
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('role', user.role);
    this.isUserLogin.next(user.role === 'user');
    this.isUserLogined.next(user.role === 'user');
    this.isAdminLogin.next(user.role === 'admin');
    this.isAdminLogined.next(user.role === 'admin');
    this.sessionInitialized = true;
    this.sessionAuthenticated = true;
  }
}
