import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LandingComponent } from './pages/landing/landing.component';
import { authGuard } from './shared/guards/auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/dashboard/dashboard.routes')
      .then(r => r.dashboardRoutes)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
