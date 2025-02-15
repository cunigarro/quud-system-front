import { EvaluateHistoryComponent } from './pages/evaluation-history/evaluation-history.component';
import { EvaluateReposComponent } from './pages/evalute-repos/evaluate-repos.component';
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
        component: EvaluateReposComponent,
      },
      {
        path: 'evaluate-history',
        component: EvaluateHistoryComponent,
      },
    ],
  },
];
