import { NgFor } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { mynaImage } from '@ng-icons/mynaui/outline';
import { TaskService } from '../../../services/task.service';
import { TaskRequest } from '../../../models/taskRequest.model';
import { PRIORITY_NAME_TO_NUMBER } from '../../../mappings/priority';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-new-task-modal',
  imports: [NgFor, FormsModule, NgIcon],
  templateUrl: './new-task-modal.component.html',
  styleUrl: './new-task-modal.component.scss',
  viewProviders: [provideIcons({ mynaImage })],
})
export class NewTaskModalComponent {
  @Output() closeModal = new EventEmitter();
  private taskService = inject(TaskService);
  private toastService = inject(ToastService);
  private uploadedFile: File | null = null;

  minDate = new Date().toISOString().split('T')[0];
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

  onSubmit(task: NgForm) {
    this.taskService.addTask(task.form.value).subscribe({
      next: () => {
        this.toastService.show('Task added', 'success');
        console.log('Toasts: ', this.toastService.toast$);
        this.closeModal.emit();
      },
      error: (err) => {
        this.toastService.show('Something went wrong', 'error');
        console.error(err);
      },
      complete: () => {
        task.form.reset();
      },
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target?.files[0];

    if (file) {
      this.uploadedFile = file;
    }
  }
}
