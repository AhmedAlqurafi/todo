import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginAPI = 'http://localhost:5080/api/auth/login';
  private httpClient = inject(HttpClient);
  private userService = inject(UserService);
  private route = inject(Router);

  login(user: { username: string; password: string }) {
    this.httpClient.post(this.loginAPI, user).subscribe({
      next: (res) => {
        console.log('subscribe: ', res);
        this.userService.setUser(res);
        this.route.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Error: ', error);
      },
    });
  }
}
