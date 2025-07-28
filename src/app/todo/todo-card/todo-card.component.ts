import { Component, Input } from '@angular/core';
import { Todo } from '../todo.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-todo-card',
  imports: [NgClass],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss',
})
export class TodoCardComponent {
  @Input({ required: true }) todo!: Todo;
}
