import { Component } from '@angular/core';
import { InputFieldComponent } from '../../sharable/input-field/input-field.component';
import { PrimaryButtonComponent } from '../../sharable/primary-button/primary-button.component';
import { RouterLink } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import {
  mynaLockPasswordSolid,
  mynaLockSolid,
  mynaUserSolid,
} from '@ng-icons/mynaui/solid';
import { mynaEnvelope, mynaUser } from '@ng-icons/mynaui/outline';

@Component({
  selector: 'app-register',
  imports: [InputFieldComponent, PrimaryButtonComponent, RouterLink],
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
export class RegisterComponent {}
