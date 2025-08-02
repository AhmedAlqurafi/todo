import { Component } from '@angular/core';
import { InputFieldComponent } from '../../sharable/input-field/input-field.component';
import { PrimaryButtonComponent } from '../../sharable/primary-button/primary-button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [InputFieldComponent, PrimaryButtonComponent, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {}
