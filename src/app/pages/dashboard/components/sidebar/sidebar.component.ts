import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'dashboard-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: true,
  imports: [
    RouterModule
  ]
})
export class SidebarComponent implements OnInit {
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void { }

  logout() {
    this.router.navigate(['/']);
  }
}
