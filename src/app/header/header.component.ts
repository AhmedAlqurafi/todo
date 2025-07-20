import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { mynaBell, mynaCalendar, mynaSearch } from '@ng-icons/mynaui/outline';
@Component({
  selector: 'app-header',
  imports: [NgIcon],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  viewProviders: [provideIcons({ mynaSearch, mynaBell, mynaCalendar })],
})
export class HeaderComponent {
  date: Date = new Date();

  get formattedDate(): string {
    return this.date.toLocaleDateString('en-UK', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  }

  get dayName(): string {
    return this.date.toLocaleDateString('en-US', {
      weekday: 'long',
    });
  }
}
