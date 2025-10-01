import { Component, inject, OnInit } from '@angular/core';
import { PrimaryButtonComponent } from '../../sharable/primary-button/primary-button.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { mynaLockSolid, mynaUserSolid } from '@ng-icons/mynaui/solid';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [PrimaryButtonComponent, RouterLink, FormsModule, NgIcon],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  viewProviders: [provideIcons({ mynaUserSolid, mynaLockSolid })],
})
export class LoginComponent {
  username = '';
  password = '';
  private authService = inject(AuthService);
  private router = inject(Router);

  onSubmit() {
    const user = {
      username: this.username,
      password: this.password,
    };

    console.log('User on submit: ', user);
    this.authService.login(user).subscribe({
      next: (res) => {
        console.log('Subscribed login: ', res);
        this.router.navigate(['/dashboard']);
      },
    });
  }
}
