import { Component, inject } from '@angular/core';
import { InputFieldComponent } from '../../sharable/input-field/input-field.component';
import { PrimaryButtonComponent } from '../../sharable/primary-button/primary-button.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  mynaLockSolid,
  mynaPasswordSolid,
  mynaUserSolid,
} from '@ng-icons/mynaui/solid';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login.service';

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
  private loginService = inject(LoginService);

  onSubmit() {
    const user = {
      username: this.username,
      password: this.password,
    };

    console.log('User on submit: ', user);
    const u = this.loginService.login(user);
    console.log('The logged in User: ', u);
  }
}
