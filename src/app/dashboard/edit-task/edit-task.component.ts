import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ToastService } from '../../services/toast.service';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { mynaImage } from '@ng-icons/mynaui/outline';
import { Task } from '../../models/task.model';
import { Title } from '@angular/platform-browser';
import { NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EditTask } from '../../models/editted-task.model';

@Component({
  selector: 'app-edit-task',
  imports: [NgIcon, FormsModule, NgFor],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss',
  viewProviders: [provideIcons({ mynaImage })],
})
export class EditTaskComponent implements OnInit {
  @Output() closeModal = new EventEmitter();
  private taskService = inject(TaskService);
  private toastService = inject(ToastService);
  private uploadedFile: File | null = null;
  private activatedRoute = inject(ActivatedRoute);

  task: Task | null = null;
  date: string = '';
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
  new: any;

  handleCloseModal() {
    this.closeModal.emit();
  }

  ngOnInit(): void {
    this.taskService.singleTask$.subscribe({
      next: (task) => {
        this.task = task;
        // Create the YYYY-MM-DD string manually using Local Time methods
        const year = task.dueDate.getFullYear();
        // Month is 0-indexed (0 = Jan), so we add 1. We also pad with '0' if needed.
        const month = ('0' + (task.dueDate.getMonth() + 1)).slice(-2);
        const day = ('0' + task.dueDate.getDate()).slice(-2);
        this.date = `${year}-${month}-${day}`;

      },
      error: (error) => {
        console.error('Erorr: ', error);
      },
    });
  }

  onSubmit(task: NgForm) {
    const taskId = parseInt(
      this.activatedRoute.snapshot.paramMap.get('taskId')!
    );

    const edittedTask: EditTask = {
      title: task.form.value.title,
      taskDesc: task.form.value.taskDesc,
      category: task.form.value.category,
      priority: task.form.value.priority,
      status: this.task!.status,
      imageURL: 'Testing',
      dueDate: task.form.value.dueDate,
    };

    this.taskService.putTask(edittedTask, taskId).subscribe({
      next: (res) => {
        this.toastService.show('Task editted successfully', 'success');
        this.closeModal.emit();
      },
      error: (error) => {
        console.error('Edit Error: ', error);
        this.toastService.show('Edit task is failed', 'error');
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
