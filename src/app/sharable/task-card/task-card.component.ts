import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { Task } from '../../models/task.model';
import { RouterLink } from "@angular/router";

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
      this.task.status === 'Not Started'
        ? 'red'
        : this.task.status === 'In-Progress'
        ? 'blue'
        : 'green';

    this.circularDiv =
      this.task.status === 'Not Started'
        ? 'circular-div-red'
        : this.task.status === 'In-Progress'
        ? 'circular-div-blue'
        : 'circular-div-green';
  }
}
