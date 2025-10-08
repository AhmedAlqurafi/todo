import { NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { NewTaskModalComponent } from './new-task-modal/new-task-modal.component';

@Component({
  selector: 'app-my-tasks',
  imports: [NewTaskModalComponent],
  templateUrl: './my-tasks.component.html',
  styleUrl: './my-tasks.component.scss',
})
export class MyTasksComponent implements AfterViewInit {
  // Create new task modal
  isModalOpen = true;
  @ViewChild('dialog') dialogRef!: ElementRef<HTMLDialogElement>;

  ngAfterViewInit(): void {
    this.dialogRef.nativeElement.showModal();
  }
  openModal(): void {
    this.dialogRef.nativeElement.showModal();
  }

  closeModal(): void {
    this.dialogRef.nativeElement.close();
  }
}
