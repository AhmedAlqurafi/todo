import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl = 'http://localhost:5080/api/auth/register';
  private usersAPI = 'https://jsonplaceholder.typicode.com/users';
  isFitching = signal(false);
  error = signal({});
  private usersSubscription!: Subscription;

  constructor(private http: HttpClient) {}

  getData() {
    this.usersSubscription = this.http.get(this.usersAPI).subscribe({
      next: (res) => {
        console.log(res);
      },
      complete: () => {
        this.usersSubscription.unsubscribe();
      },
    });
  }

  getBlahData() {
    this.http.get('http://localhost:5080/api/auth/blah').subscribe({
      next: (res) => {
        console.log('Blah: ', res);
      },
    });
  }
  postData(user: any) {
    console.log('User servicce: ', user);
    this.http.post(this.apiUrl, user).subscribe({
      next: (res) => {
        console.log('Result: ', res);
      },
      error: (error) => {
        console.error(error);
      },
    });
    // return this.http.post(this.apiUrl, user);
  }
}
