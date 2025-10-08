import { Component, Input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-card',
  imports: [NgIcon],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) icon!: string;
  @Input() style?: string;
}
