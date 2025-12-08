import {
  Component,
  ElementRef,
  inject,
  model,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IconButtonComponent } from '../../sharable/icon-button/icon-button.component';
import { provideIcons } from '@ng-icons/core';
import {
  mynaCheckCircleSolid,
  mynaClockThreeSolid,
  mynaEditOneSolid,
  mynaTrashOneSolid,
} from '@ng-icons/mynaui/solid';
import { STATUS_NUMBER_TO_NAME } from '../../mappings/status';
import { EditTaskComponent } from '../edit-task/edit-task.component';

@Component({
  selector: 'app-single-task',
  imports: [RouterLink, IconButtonComponent, EditTaskComponent],
  templateUrl: './single-task.component.html',
  styleUrl: './single-task.component.scss',
  viewProviders: [
    provideIcons({
      mynaTrashOneSolid,
      mynaEditOneSolid,
      mynaClockThreeSolid,
      mynaCheckCircleSolid,
    }),
  ],
})
export class SingleTaskComponent implements OnInit {
  private taskService = inject(TaskService);
  private activeRoute = inject(ActivatedRoute);
  private router = inject(Router);

  isModalOpen = true;
  @ViewChild('dialog') dialogRef!: ElementRef<HTMLDialogElement>;

  priorityStyle!: string;
  statusStyle!: string;
  circularDiv!: string;
  task: Task | null = null;

  formattedDate(date: Date | undefined): string | undefined {
    return date?.toLocaleDateString('en-UK', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  }

  ngOnInit(): void {
    const taskId = parseInt(this.activeRoute.snapshot.paramMap.get('taskId')!);
    this.taskService.getTaskById(taskId);

    this.taskService.singleTask$.subscribe({
      next: (data) => {
        this.task = data;
        // Initilize styles
        this.priorityStyle =
          this.task?.priority === 'High'
            ? 'red'
            : this.task?.priority === 'Medium'
            ? 'orange'
            : 'sky-blue';

        this.statusStyle =
          this.task?.status === 1
            ? 'red'
            : this.task?.status === 2
            ? 'blue'
            : 'green';

        this.circularDiv =
          this.task?.status === 1
            ? 'circular-div-red'
            : this.task?.status === 2
            ? 'circular-div-blue'
            : 'circular-div-green';
      },
      error: (err) => {
        console.error(err);
      },
    });
    // this.taskService.getTaskById(taskId).subscribe({
    //   next: (res) => {
    //     console.log('Task fetched: ', res);
    //     this.task = res;

    //   },
    //   error: (err) => {
    //     console.error('Error fetching task: ', err);
    //   },
    // });
  }

  taskStatusLabel(statusId: number | undefined): string | undefined {
    return STATUS_NUMBER_TO_NAME.get(statusId);
  }

  handleEditTask() {
    this.openModal();
  }
  handleDeleteTask(taskId: number) {
    const res = this.taskService.deleteTask(taskId);
    if (res) {
      this.router.navigateByUrl('/dashboard');
    } else {
      console.error('Error occured');
    }
  }

  handleChangeStatusToInProgress(taskId: number) {
    this.taskService.changeStatusToInProgress(taskId);
    this.taskService.singleTask$.subscribe({
      next: (data) => {
        this.task = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  handleChangeStatusToCompleted(taskId: number) {
    this.taskService.changeStatusToCompleted(taskId);
    this.taskService.singleTask$.subscribe({
      next: (data) => {
        this.task = data;
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
