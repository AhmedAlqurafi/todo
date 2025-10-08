import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-new-task-modal',
  imports: [],
  templateUrl: './new-task-modal.component.html',
  styleUrl: './new-task-modal.component.scss',
})
export class NewTaskModalComponent {
  @Output() closeModal = new EventEmitter();

  handleCloseModal() {
    this.closeModal.emit();
  }
}
