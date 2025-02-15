import { Component, OnInit } from '@angular/core';
import { mdiMenuDown } from '@mdi/js';
import { SHARED_IMPORTS } from '../../../../shared/shared.imports';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'dashboard-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    SHARED_IMPORTS,
    RouterModule
  ]
})
export class HeaderComponent implements OnInit {
  mdiMenuDown: string = mdiMenuDown;

  constructor() { }

  ngOnInit(): void { }
}
