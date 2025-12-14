import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { IconType, NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-icon-button',
  imports: [NgIcon],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.scss',
  encapsulation: ViewEncapsulation.None,
  // viewProviders: [provideIcons({mynaTrashOneSolid, })],
})
export class IconButtonComponent {
  @Input({ required: true }) iconName: IconType | undefined;
  @Input({ required: false }) tooltip: string = '';
  @Input({required: false}) disabled: boolean = false
  @Output() onClick = new EventEmitter();

  handleOnClick(event: Event) {
    this.onClick.emit(event);
  }
}
