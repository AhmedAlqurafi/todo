import { Component, Input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-input-field',
  imports: [NgIcon],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss',
})
export class InputFieldComponent {
  @Input({ required: true }) placeholder!: string;
  @Input() type = 'text';
  @Input({ required: true }) icon!: string;
}
