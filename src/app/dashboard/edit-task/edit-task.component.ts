import { Component, EventEmitter, inject, Output } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ToastService } from '../../services/toast.service';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { mynaImage } from '@ng-icons/mynaui/outline';

@Component({
  selector: 'app-edit-task',
  imports: [NgIcon, FormsModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss',
  viewProviders: [provideIcons({ mynaImage })],
})
export class EditTaskComponent {
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
        this.toastService.toast$.subscribe({
          next: (taosts) => console.log('Toasts: ', taosts),
        });

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
