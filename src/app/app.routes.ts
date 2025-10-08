import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './auth/auth.guard';
import { GuestGuardService } from './auth/guest.guard';
import { MyTasksComponent } from './dashboard/my-tasks/my-tasks.component';
import { HomepageComponent } from './dashboard/homepage.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'auth',
    children: [
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [GuestGuardService],
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [GuestGuardService],
      },
    ],
  },

  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        component: HomepageComponent,
      },
      {
        path: 'my-tasks',
        component: MyTasksComponent,
      },
    ],
  },
];
