import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { mynaChartColumnSolid } from '@ng-icons/mynaui/solid';

@Component({
  selector: 'app-dashboard-box',
  imports: [NgIcon],
  templateUrl: './dashboard-box.component.html',
  styleUrl: './dashboard-box.component.scss',
  viewProviders: [provideIcons({ mynaChartColumnSolid })],
})
export class DashboardBoxComponent {}
