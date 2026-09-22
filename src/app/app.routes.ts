import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { AppLayout } from './layout/app-layout/app-layout';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },
  {
    path: '',
    component: AppLayout,
    canActivate: [MsalGuard],
    canActivateChild: [MsalGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'sales',
        loadComponent: () => import('./pages/sales/sales').then((m) => m.Sales),
      },
      {
        path: 'customers',
        loadComponent: () => import('./pages/customers/customers').then((m) => m.Customers),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];
