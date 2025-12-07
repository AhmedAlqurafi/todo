import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, Subscription, tap } from 'rxjs';
import { User } from '../models/user.model';
import { RegisterRequest } from '../models/register.model';
import { AuthResponse } from '../auth/auth.model';
import { LoginRequest } from '../models/login.model';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private toastService = inject(ToastService);
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
      tap((response) => {
        localStorage.setItem('token', response.result.token);
        localStorage.setItem('user', JSON.stringify(response.result.user));

        this.tokenSubject.next(response.result.token);
        this.currentUserSubject.next(response.result.user);
      })
    );
  }

  login(user: LoginRequest): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(this.loginAPI, user).pipe(
      tap((response) => {
        localStorage.setItem('token', response.result.token);
        localStorage.setItem('user', JSON.stringify(response.result.user));

        this.tokenSubject.next(response.result.token);
        this.currentUserSubject.next(response.result.user);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.tokenSubject.next('');
    this.currentUserSubject.next(null);
    this.toastService.show('Logout successful', 'success');
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
