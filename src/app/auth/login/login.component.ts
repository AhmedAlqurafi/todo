import { Component } from '@angular/core';
import { InputFieldComponent } from '../../sharable/input-field/input-field.component';
import { PrimaryButtonComponent } from '../../sharable/primary-button/primary-button.component';
import { provideIcons } from '@ng-icons/core';
import {
  mynaLockSolid,
  mynaPasswordSolid,
  mynaUserSolid,
} from '@ng-icons/mynaui/solid';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [InputFieldComponent, PrimaryButtonComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  viewProviders: [provideIcons({ mynaUserSolid, mynaLockSolid })],
})
export class LoginComponent {}
