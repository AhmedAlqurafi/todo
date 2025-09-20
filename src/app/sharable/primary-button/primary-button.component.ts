import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  imports: [],
  templateUrl: './primary-button.component.html',
  styleUrl: './primary-button.component.scss',
})
export class PrimaryButtonComponent {
  @Input({ required: true }) label!: string;
  @Output() onClick = new EventEmitter<Event>();

  handleClick() {
    this.onClick.emit();
  }
}
