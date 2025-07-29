import { Component } from '@angular/core';
import { TodoCardComponent } from '../todo/todo-card/todo-card.component';
import { TODO } from '../../data/todo';
import { ProgressBarComponent } from '../sharable/progress-bar/progress-bar.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  mynaChartColumnIncreasingSolid,
  mynaCheckCircleOneSolid,
} from '@ng-icons/mynaui/solid';
import { CardComponent } from './card/card.component';

@Component({
  selector: 'app-dashboard',
  imports: [TodoCardComponent, ProgressBarComponent, CardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  viewProviders: [
    provideIcons({ mynaChartColumnIncreasingSolid, mynaCheckCircleOneSolid }),
  ],
})
export class DashboardComponent {
  todoTasks = TODO;
}
