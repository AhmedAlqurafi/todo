import { Component, inject } from '@angular/core';
import { TodoCardComponent } from '../todo/todo-card/todo-card.component';
import { TODO } from '../../data/todo';
import { ProgressBarComponent } from '../sharable/progress-bar/progress-bar.component';
import { provideIcons } from '@ng-icons/core';
import {
  mynaChartColumnIncreasingSolid,
  mynaCheckCircleOneSolid,
} from '@ng-icons/mynaui/solid';
import { CardComponent } from '../sharable/card/card.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [TodoCardComponent, ProgressBarComponent, CardComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
  viewProviders: [
    provideIcons({ mynaChartColumnIncreasingSolid, mynaCheckCircleOneSolid }),
  ],
})
export class HomepageComponent {
  todoTasks = TODO;
  private authService = inject(AuthService);
  user = this.authService.getCurrentUser();
}
