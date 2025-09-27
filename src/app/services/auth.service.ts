import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  Subscription,
} from 'rxjs';
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
  private userService = inject(UserService);
  private router = inject(Router);
  private registerApi = 'http://localhost:5080/api/auth/register';
  private usersAPI = 'https://jsonplaceholder.typicode.com/users';
  isFitching = signal(false);
  error = signal({});
  private usersSubscription!: Subscription;

  constructor() {
    this.loadStoredAuth();
  }
  // Claude solution
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private tokenSubject = new BehaviorSubject<string | null>(null);

  private currentUser$ = this.currentUserSubject.asObservable();
  private token$ = this.tokenSubject.asObservable();

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
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));

        this.tokenSubject.next(response.token);
        this.currentUserSubject.next(response.user);
        return response;
      })
    );
  }

  login(user: LoginRequest): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(this.loginAPI, user).pipe(
      map((response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));

        this.tokenSubject.next(response.token);
        this.currentUserSubject.next(response.user);
        return response;
      })
    );
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // private setAuth(authResponse: any): void {
  //   localStorage.setItem('token', authResponse.token);
  //   localStorage.setItem('user', JSON.stringify(authResponse.user));

  //   this.tokenSubject.next(authResponse.token);
  //   this.currentUserSubject.next(authResponse.user);
  // }

  isAuthenticated(): boolean {
    return !!this.tokenSubject.value;
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }
}
