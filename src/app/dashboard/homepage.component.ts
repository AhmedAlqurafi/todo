import { Component, inject, ViewEncapsulation } from '@angular/core';
import { ProgressBarComponent } from '../sharable/progress-bar/progress-bar.component';
import { provideIcons } from '@ng-icons/core';
import {
  mynaChartColumnIncreasingSolid,
  mynaCheckCircleOneSolid,
} from '@ng-icons/mynaui/solid';
import { CardComponent } from '../sharable/card/card.component';
import { AuthService } from '../services/auth.service';
import { TaskCardComponent } from '../sharable/task-card/task-card.component';

@Component({
  selector: 'app-dashboard',
  imports: [TaskCardComponent, ProgressBarComponent, CardComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
  viewProviders: [
    provideIcons({ mynaChartColumnIncreasingSolid, mynaCheckCircleOneSolid }),
  ],
})
export class HomepageComponent {
  // todoTasks = ;
  private authService = inject(AuthService);
  user = this.authService.getCurrentUser();
}
