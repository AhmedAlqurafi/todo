import { NgFor } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { mynaImage } from '@ng-icons/mynaui/outline';
import { TaskService } from '../../../services/task.service';

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
  private uploadedFile: File | null = null;

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
    const taskValues = task.form.value;

    const newTask = {
      Title: taskValues.title,
      Details: taskValues.taskDesc,
      CategoryId: taskValues.category,
      PriorityId: taskValues.priority,
      Deadline: taskValues.dueDate,
      ImageURL: 'http://test.com',
    };
    console.log('New Task: ', newTask);

    this.taskService.addTask(newTask).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.error(err);
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
