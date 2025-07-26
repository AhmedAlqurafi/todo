import { Component } from '@angular/core';
import { SIDEBAR_ITEMS } from '../../data/sidebar';
import { ItemComponent } from './item/item.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { mynaLogoutSolid } from '@ng-icons/mynaui/solid';

@Component({
  selector: 'app-sidebar',
  imports: [ItemComponent, NgIcon],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  viewProviders: [provideIcons({ mynaLogoutSolid })],
})
export class SidebarComponent {
  sidebarItems = SIDEBAR_ITEMS;
}
