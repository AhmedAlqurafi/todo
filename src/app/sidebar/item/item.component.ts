import { Component, Input } from '@angular/core';
import { SideBarItem } from './item.model';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  mynaCalendarCheckSolid,
  mynaCogFourSolid,
  mynaDangerSolid,
  mynaGridSolid,
  mynaListSolid,
  mynaQuestionCircleSolid,
} from '@ng-icons/mynaui/solid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item',
  imports: [NgIcon],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
  viewProviders: [
    provideIcons({
      mynaGridSolid,
      mynaDangerSolid,
      mynaCalendarCheckSolid,
      mynaListSolid,
      mynaCogFourSolid,
      mynaQuestionCircleSolid,
    }),
  ],
})
export class ItemComponent {
  @Input({ required: true }) item!: SideBarItem;
  path: string;

  constructor(private router: Router) {
    this.path = this.router.url.split('?')[0];
  }
}
