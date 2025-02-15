import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { RegisterReposComponent } from './pages/register-repos/register-repos.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [
    RouterModule,
    RegisterReposComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent
  ]
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
