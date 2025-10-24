import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { TaskResponse } from '../models/taskResponse.model';
import { PRIORITY_NAME_TO_NUMBER } from '../mappings/priority';
import { TaskRequest } from '../models/taskRequest.model';
import { NewTask } from '../models/new-task.model';
import { mapBackendTaskToFrontend } from '../mappings/task';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSubjects = new BehaviorSubject<Task[]>([]);
  public tasks$ = this.tasksSubjects.asObservable();

  private loadingSubjects = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubjects.asObservable();

  private readonly getMyTasksURL = 'http://localhost:5080/api/todo/me';
  private readonly taskURL = 'http://localhost:5080/api/todo';
  private authService = inject(AuthService);
  private httpClient = inject(HttpClient);

  get currentTasks(): Task[] {
    return this.tasksSubjects.value;
  }

  getMyTasks(): void {
    this.httpClient
      .get<TaskResponse[]>(this.getMyTasksURL, {
        headers: {
          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      })
      .pipe(
        map((taskArray) =>
          taskArray.map((task) => mapBackendTaskToFrontend(task))
        )
      )
      .subscribe({
        next: (tasks) => {
          this.tasksSubjects.next(tasks);
        },
        error: (err) => {
          console.error('Error loading tasks: ', err);
        },
      });

    // return this.httpClient
    //   .get<TaskResponse[]>(this.getMyTasksURL, {
    //     headers: {
    //       Authorization: `Bearer ${this.authService.getToken()}`,
    //     },
    //   })
    //   .pipe(
    //     map((taskArray) =>
    //       taskArray.map((task) => mapBackendTaskToFrontend(task))
    //     )
    //   );
  }

  addTask(task: NewTask): Observable<any> {
    const newTask: TaskRequest = {
      Title: task.title,
      Details: task.taskDesc,
      CategoryId: task.category,
      PriorityId: PRIORITY_NAME_TO_NUMBER.get(task.priority),
      Deadline: task.dueDate,
      ImageURL: 'http://test.com',
    };

    return this.httpClient
      .post<TaskResponse>(this.taskURL, newTask, {
        headers: {
          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      })
      .pipe(
        tap((newTask) => {
          const convertedNewTask = mapBackendTaskToFrontend(newTask);
          const currentTasksState = this.tasksSubjects.value;
          this.tasksSubjects.next([...currentTasksState, convertedNewTask]);
        })
      );
  }
}
