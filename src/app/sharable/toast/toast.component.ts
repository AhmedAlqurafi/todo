import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  mynaCheckCircleSolid,
  mynaInfoCircleSolid,
  mynaXCircleSolid,
} from '@ng-icons/mynaui/solid';

@Component({
  selector: 'app-toast',
  imports: [AsyncPipe, NgClass, NgIcon],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  viewProviders: [
    provideIcons({
      mynaCheckCircleSolid,
      mynaXCircleSolid,
      mynaInfoCircleSolid,
    }),
  ],
})
export class ToastComponent {
  toastSubject = inject(ToastService);
}
