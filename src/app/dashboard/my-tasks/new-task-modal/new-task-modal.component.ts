import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { mynaImage } from '@ng-icons/mynaui/outline';

@Component({
  selector: 'app-new-task-modal',
  imports: [NgFor, FormsModule, NgIcon],
  templateUrl: './new-task-modal.component.html',
  styleUrl: './new-task-modal.component.scss',
  viewProviders: [provideIcons({ mynaImage })],
})
export class NewTaskModalComponent {
  @Output() closeModal = new EventEmitter();
  categoriesList = [
    {
      id: 1,
      categoryName: 'Work',
    },
    {
      id: 2,
      categoryName: 'Shopping',
    },
  ];
  handleCloseModal() {
    this.closeModal.emit();
  }

  onSubmit(newTask: NgForm) {
    console.log('New Task: ', newTask.form.value);
  }

  onFileSelected(event: any) {
    const file: File = event.target?.files[0];

    if (file) {
      console.log('File: ', file);
    }
  }
}
