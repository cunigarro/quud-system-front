import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { mdiChevronRight } from '@mdi/js';
import { SHARED_IMPORTS } from '../../../../shared/shared.imports';

@Component({
  selector: 'dashboard-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: true,
  imports: [
    SHARED_IMPORTS,
    RouterModule
  ]
})
export class SidebarComponent implements OnInit {
  mdiChevronRight: string = mdiChevronRight;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void { }

  logout() {
    this.router.navigate(['/']);
  }
}
