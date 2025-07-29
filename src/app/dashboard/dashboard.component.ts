import { Component } from '@angular/core';
import { TodoCardComponent } from '../todo/todo-card/todo-card.component';
import { TODO } from '../../data/todo';
import { ProgressBarComponent } from '../sharable/progress-bar/progress-bar.component';

@Component({
  selector: 'app-dashboard',
  imports: [TodoCardComponent, ProgressBarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  todoTasks = TODO;
}
