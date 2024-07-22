import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { authGuard } from './core/guards/auth.guard';
import { HomeComponent } from './layout/home/home.component';
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./components/main/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent
          ),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'active',
        loadComponent: () =>
          import('./components/active/active.component').then(
            (c) => c.ActiveComponent
          ),
      },
      {
        path: 'completed',
        loadComponent: () =>
          import('./components/completed/completed.component').then(
            (c) => c.CompletedComponent
          ),
      },
    ],
  },
];
