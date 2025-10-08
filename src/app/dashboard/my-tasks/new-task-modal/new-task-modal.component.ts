import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-new-task-modal',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
  ],
  templateUrl: './new-task-modal.component.html',
  styleUrl: './new-task-modal.component.scss',
})
export class NewTaskModalComponent {
  readonly dialog = inject(MatDialog);

  closeDialog(): void {
    this.dialog.closeAll();
  }
}
