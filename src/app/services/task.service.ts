import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { TaskResponse } from '../models/taskResponse.model';
import { PRIORITY_NAME_TO_NUMBER } from '../mappings/priority';
import { TaskRequest } from '../models/taskRequest.model';
import { NewTask } from '../models/new-task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly taskUrl = 'http://localhost:5080/api/todo';
  private authService = inject(AuthService);
  private httpClient = inject(HttpClient);

  addTask(task: NewTask): Observable<any> {
    const newTask: TaskRequest = {
      Title: task.title,
      Details: task.textDesc,
      CategoryId: task.category,
      PriorityId: PRIORITY_NAME_TO_NUMBER.get(task.priority),
      Deadline: task.dueDate,
      ImageURL: 'http://test.com',
    };

    return this.httpClient.post(this.taskUrl, newTask, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    });
  }

  getTasks(): Observable<TaskResponse> {
    const tasks = this.httpClient.get<TaskResponse>(this.taskUrl, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    });

    return tasks;
  }
}
