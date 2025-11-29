import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ProgressBarComponent } from '../sharable/progress-bar/progress-bar.component';
import { NgIcon, NgIconConfig, provideIcons } from '@ng-icons/core';
import {
  mynaChartColumnIncreasingSolid,
  mynaCheckCircleOneSolid,
  mynaPlusSolid,
} from '@ng-icons/mynaui/solid';
import { CardComponent } from '../sharable/card/card.component';
import { AuthService } from '../services/auth.service';
import { TaskCardComponent } from '../sharable/task-card/task-card.component';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { mynaClipboard } from '@ng-icons/mynaui/outline';
import { RouterOutlet } from '@angular/router';
import { NewTaskModalComponent } from './my-tasks/new-task-modal/new-task-modal.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    TaskCardComponent,
    ProgressBarComponent,
    CardComponent,
    NgIcon,
    NewTaskModalComponent,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
  viewProviders: [
    provideIcons({
      mynaChartColumnIncreasingSolid,
      mynaCheckCircleOneSolid,
      mynaClipboard,
      mynaPlusSolid,
    }),
  ],
})
export class HomepageComponent implements OnInit {
  todoTasks: Task[] | null = null;
  completedTasks: Task[] | null = null;
  private authService = inject(AuthService);
  user = this.authService.getCurrentUser();
  private taskService = inject(TaskService);

  isModalOpen = true;
  @ViewChild('dialog') dialogRef!: ElementRef<HTMLDialogElement>;

  ngOnInit(): void {
    this.taskService.getMyTasks();
    this.taskService.tasks$.subscribe({
      next: (res) => {
        this.todoTasks = res;
      },
    });

    this.taskService.getCompletedTasks();
    this.taskService.completedTasks$.subscribe({
      next: (data) => {
        this.completedTasks = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  openModal(): void {
    this.dialogRef.nativeElement.showModal();
  }

  closeModal(): void {
    this.dialogRef.nativeElement.close();
  }
}
