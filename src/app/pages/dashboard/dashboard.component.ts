import { Component, OnInit } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { routes } from './dashboard.routes';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    SidebarComponent,
    FooterComponent
  ]
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
