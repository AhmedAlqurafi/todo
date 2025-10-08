import { Component, inject, OnInit } from '@angular/core';
import { SIDEBAR_ITEMS } from '../../../../data/sidebar';
import { ItemComponent } from './item/item.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { mynaLogoutSolid } from '@ng-icons/mynaui/solid';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [ItemComponent, NgIcon],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  viewProviders: [provideIcons({ mynaLogoutSolid })],
})
export class SidebarComponent {
  sidebarItems = SIDEBAR_ITEMS;
  userService = inject(UserService);
  private authService = inject(AuthService);
  user = this.authService.getCurrentUser();

  handleLogout() {
    this.authService.logout();
    console.log('Working');
  }
}
