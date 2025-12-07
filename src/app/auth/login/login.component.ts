import { Component, inject, OnInit } from '@angular/core';
import { PrimaryButtonComponent } from '../../sharable/primary-button/primary-button.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { mynaLockSolid, mynaUserSolid } from '@ng-icons/mynaui/solid';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AutoFocusDirective } from '../../directives/autofocus.directive';
import { InputFieldComponent } from '../../sharable/input-field/input-field.component';
import { ToastService } from '../../services/toast.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    PrimaryButtonComponent,
    RouterLink,
    FormsModule,
    NgIcon,
    AutoFocusDirective,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  viewProviders: [provideIcons({ mynaUserSolid, mynaLockSolid })],
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastService = inject(ToastService);

  onSubmit(form: NgForm) {
    const user = {
      username: form.value.username,
      password: form.value.password,
    };

    this.authService.login(user).subscribe({
      next: () => {
        this.toastService.show('Welcome back!', 'success');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.toastService.show(err.error.errorMessages[0], 'error');
      },
    });
  }
}
