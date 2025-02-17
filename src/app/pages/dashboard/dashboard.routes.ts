import { EvaluateHistoryComponent } from './pages/evaluation-history/evaluation-history.component';
import { EvaluatedReposComponent } from './pages/evaluted-repos/evaluated-repos.component';
import { RegisterReposComponent } from './pages/register-repos/register-repos.component';
import { DashboardComponent } from './dashboard.component';
import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'register-repositories',
        pathMatch: 'full'
      },
      {
        path: 'register-repositories',
        component: RegisterReposComponent,
      },
      {
        path: 'evaluate-repositories',
        component: EvaluatedReposComponent,
      },
      {
        path: 'evaluate-history',
        component: EvaluateHistoryComponent,
      },
    ],
  },
];
