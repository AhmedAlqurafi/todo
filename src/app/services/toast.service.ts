import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast } from '../models/toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new BehaviorSubject<Toast[]>([]);
  public toast$ = this.toastSubject.asObservable();

  show(message: string, type: 'success' | 'error' | 'info'): void {
    const id = Date.now().toString();
    const newToast: Toast = { id, message, type };

    const currentToast = this.toastSubject.value;
    this.toastSubject.next([...currentToast, newToast]);

    const delay = type === 'error' ? 7000 : 3000;
    setTimeout(() => {
      this.remove(id);
    }, delay);
  }

  remove(id: string): void {
    const currentToasts = this.toastSubject.value;
    const updatedToasts = currentToasts.filter((toast) => toast.id !== id);
    this.toastSubject.next(updatedToasts);
  }
}
