import { Component, inject } from '@angular/core';
import { InputFieldComponent } from '../../sharable/input-field/input-field.component';
import { PrimaryButtonComponent } from '../../sharable/primary-button/primary-button.component';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  mynaLockPasswordSolid,
  mynaLockSolid,
  mynaUserSolid,
} from '@ng-icons/mynaui/solid';
import { mynaEnvelope, mynaUser } from '@ng-icons/mynaui/outline';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AutoFocusDirective } from '../../directives/autofocus.directive';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    PrimaryButtonComponent,
    RouterLink,
    NgIcon,
    AutoFocusDirective,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  viewProviders: [
    provideIcons({
      mynaUser,
      mynaUserSolid,
      mynaEnvelope,
      mynaLockSolid,
      mynaLockPasswordSolid,
    }),
  ],
})
export class RegisterComponent {
  firstName = '';
  lastName = '';
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  private authService = inject(AuthService);
  private router = inject(Router);

  onSubmit() {
    const newUser = {
      FirstName: this.firstName,
      LastName: this.lastName,
      Username: this.username,
      Email: this.email,
      Password: this.password,
      ConfirmPassword: this.confirmPassword,
    };

    this.authService.register(newUser).subscribe({
      next: (res) => {
        console.log('From component: ', res);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Registration failed: ', error);
      },
    });
  }
}
