import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { NewTaskModalComponent } from './new-task-modal/new-task-modal.component';

@Component({
  selector: 'app-my-tasks',
  imports: [MatButtonModule],
  templateUrl: './my-tasks.component.html',
  styleUrl: './my-tasks.component.scss',
})
export class MyTasksComponent {
  // Create new task modal
  isModalOpen = false;
  readonly dialog = inject(MatDialog);

  openDialog(): void {
    this.dialog.open(NewTaskModalComponent);
  }
}
