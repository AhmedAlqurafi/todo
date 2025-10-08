import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';
import { User } from '../auth/user.model';
import { RegisterRequest } from '../auth/register/register.model';
import { AuthResponse } from '../auth/auth.model';
import { LoginRequest } from '../auth/login/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginAPI = 'http://localhost:5080/api/auth/login';
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private registerApi = 'http://localhost:5080/api/auth/register';
  isFitching = signal(false);
  error = signal({});

  constructor() {
    this.loadStoredAuth();
  }

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private tokenSubject = new BehaviorSubject<string | null>(null);

  private loadStoredAuth(): void {
    const token = localStorage.getItem('token');
    const userJson = localStorage.getItem('user');

    if (token && userJson) {
      try {
        const user = JSON.parse(userJson);
        this.currentUserSubject.next(user);
        this.tokenSubject.next(token);
      } catch (error) {
        //this.clearAuth()
      }
    }
  }

  register(user: RegisterRequest): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(this.registerApi, user).pipe(
      map((response) => {
        localStorage.setItem('token', response.result.token);
        localStorage.setItem('user', JSON.stringify(response.result.user));

        this.tokenSubject.next(response.result.token);
        this.currentUserSubject.next(response.result.user);
        return response;
      })
    );
  }

  login(user: LoginRequest): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(this.loginAPI, user).pipe(
      map((response) => {
        localStorage.setItem('token', response.result.token);
        localStorage.setItem('user', JSON.stringify(response.result.user));

        this.tokenSubject.next(response.result.token);
        this.currentUserSubject.next(response.result.user);
        return response;
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.tokenSubject.value;
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }
}
