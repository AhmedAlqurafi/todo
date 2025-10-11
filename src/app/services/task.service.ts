import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly taskUrl = 'http://localhost:5080/api/todo';
  private authService = inject(AuthService);
  private HttpClient = inject(HttpClient);

  addTask(task: any): Observable<any> {
    return this.HttpClient.post(this.taskUrl, task, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
}
