import { Component } from '@angular/core';
import { TodoCardComponent } from '../todo/todo-card/todo-card.component';
import { TODO } from '../../data/todo';

@Component({
  selector: 'app-dashboard',
  imports: [TodoCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  todoTasks = TODO;
}
