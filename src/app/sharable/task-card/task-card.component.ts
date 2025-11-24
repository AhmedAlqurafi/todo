import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { Task } from '../../models/task.model';
import { RouterLink } from '@angular/router';
import { STATUS_NUMBER_TO_NAME } from '../../mappings/status';

@Component({
  selector: 'app-task-card',
  imports: [RouterLink],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  @Input({ required: true }) task!: Task;
  priorityStyle!: string;
  statusStyle!: string;
  circularDiv!: string;

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
}
