import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnInit,
  inject,
} from '@angular/core';
import { NewTaskModalComponent } from './new-task-modal/new-task-modal.component';
import { TaskService } from '../../services/task.service';
import { TaskResponse } from '../../models/taskResponse.model';
import { TaskCardComponent } from '../../sharable/task-card/task-card.component';

@Component({
  selector: 'app-my-tasks',
  imports: [NewTaskModalComponent, TaskCardComponent, NgFor],
  templateUrl: './my-tasks.component.html',
  styleUrl: './my-tasks.component.scss',
})
export class MyTasksComponent implements OnInit {
  // Create new task modal
  private readonly taskService = inject(TaskService);
  tasksList: TaskResponse[] | null = null;
  isModalOpen = true;
  @ViewChild('dialog') dialogRef!: ElementRef<HTMLDialogElement>;

  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (res) => {
        console.log('Tasks: ', res);
        this.tasksList = [res];
      },
      error: (err) => {
        console.error('Error: ', err);
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
