import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  standalone: true,
  imports: [RouterModule],
})
export class LandingComponent implements OnInit {
  currentYear = new Date().getFullYear();

  constructor() {}

  ngOnInit(): void {}
}
