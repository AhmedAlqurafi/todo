import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ToastService } from '../../services/toast.service';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { mynaImage } from '@ng-icons/mynaui/outline';
import { Task } from '../../models/task.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-task',
  imports: [NgIcon, FormsModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss',
  viewProviders: [provideIcons({ mynaImage })],
})
export class EditTaskComponent implements OnInit{
  @Output() closeModal = new EventEmitter();
  private taskService = inject(TaskService);
  private toastService = inject(ToastService);
  private uploadedFile: File | null = null;
title: string = ''  
  task: Task | null = null
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

  onSubmit(task: NgForm) {
    console.log("Edit task: ", task.form.value)
    const edittedTask = {
      title: task.form.value.title,
      taskDesc: task.form.value.taskDesc,
category: task.form.value.category,
  priority: task.form.value.priority,
  // imageURL: string;
  // dueDate: Date;

    }
    // this.taskService.editTask(task)
    // this.taskService.addTask(task.form.value).subscribe({
    //   next: () => {
    //     this.toastService.show('Task added', 'success');
    //     this.toastService.toast$.subscribe({
    //       next: (taosts) => console.log('Toasts: ', taosts),
    //     });

    //     this.closeModal.emit();
    //   },
    //   error: (err) => {
    //     this.toastService.show('Something went wrong', 'error');
    //     console.error(err);
    //   },
    //   complete: () => {
    //     task.form.reset();
    //   },
    // });
  }

ngOnInit(): void {
    this.taskService.singleTask$.subscribe({
      next: (task) => {
        this.task = task

        console.log("Task: ", task)
      }, error: (error) => {
        console.error("Erorr: ", error)
      }
    })


}
  onFileSelected(event: any) {
    const file: File = event.target?.files[0];

    if (file) {
      this.uploadedFile = file;
    }
  }
}
