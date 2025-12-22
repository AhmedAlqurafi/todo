import { Component, inject, Input, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { Task } from '../../models/task.model';
import { RouterLink } from '@angular/router';
import { STATUS_NUMBER_TO_NAME } from '../../mappings/status';
import { TaskService } from '../../services/task.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-task-card',
  imports: [RouterLink],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  @Input({ required: true }) task!: Task;
  private taskService = inject(TaskService)
  private toastService = inject(ToastService)
  priorityStyle!: string;
  statusStyle!: string;
  circularDiv!: string;
  isSubmenuOpen = signal(false)

  ngOnInit() {
    this.priorityStyle =
      this.task.priority === 'High'
        ? 'red'
        : this.task.priority === 'Medium'
        ? 'orange'
        : 'sky-blue';

    this.statusStyle =
      this.task.status === 1
        ? 'red'
        : this.task.status === 2
        ? 'blue'
        : 'green';

    this.circularDiv =
      this.task.status === 1
        ? 'circular-div-red'
        : this.task.status === 2
        ? 'circular-div-blue'
        : 'circular-div-green';
  }

  get taskStatusLabel(): string | undefined {
    return STATUS_NUMBER_TO_NAME.get(this.task.status);
  }

 
  toggleSubmenu() {
    this.isSubmenuOpen.update(prev => !prev)
    console.log("Clicked")
  }

 handleDeleteTask(taskId: number) {
    const res = this.taskService.deleteTask(taskId);
    if (res) {
      this.toastService.show("Task deleted successfully", 'success')
      this.taskService.getMyTasks()
      // this.router.navigateByUrl('/dashboard');
    } else {
      console.error('Error occured');
    }
  }
}
