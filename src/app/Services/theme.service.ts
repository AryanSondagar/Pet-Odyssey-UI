import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly storageKey = 'user-ui-theme';
  private readonly darkThemeSubject = new BehaviorSubject<boolean>(false);
  readonly darkTheme$ = this.darkThemeSubject.asObservable();

  initializeTheme(): void {
    const storedTheme = localStorage.getItem(this.storageKey);
    const isDarkTheme = storedTheme === 'dark';
    this.setTheme(isDarkTheme);
  }

  toggleTheme(): void {
    this.setTheme(!this.darkThemeSubject.value);
  }

  setThemeMode(mode: 'light' | 'dark'): void {
    this.setTheme(mode === 'dark');
  }

  isDarkTheme(): boolean {
    return this.darkThemeSubject.value;
  }

  private setTheme(isDarkTheme: boolean): void {
    document.body.classList.toggle('dark-theme', isDarkTheme);
    localStorage.setItem(this.storageKey, isDarkTheme ? 'dark' : 'light');
    this.darkThemeSubject.next(isDarkTheme);
  }
}
