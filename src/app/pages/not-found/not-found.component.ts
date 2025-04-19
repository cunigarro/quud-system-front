import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../dashboard/components/header/header.component';
import { FooterComponent } from '../dashboard/components/footer/footer.component';
import { MatButton } from '@angular/material/button';

@Component({
  templateUrl: './not-found.component.html',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent,
    MatButton
  ]
})
export class NotFoundComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }
}
