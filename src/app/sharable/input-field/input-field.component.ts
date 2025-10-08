import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { AutoFocusDirective } from '../../directives/autofocus.directive';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  imports: [NgIcon, FormsModule],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss',
})
export class InputFieldComponent {
  @Input({ required: true }) placeholder!: string;
  @Input() type = 'text';
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) name!: string;
  @Input({ required: false }) id!: string;
  @Input({ required: false }) appAutoFocus: boolean = false;
}
