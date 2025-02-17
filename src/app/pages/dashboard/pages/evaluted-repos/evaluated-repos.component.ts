import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  templateUrl: './evaluated-repos.component.html',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
})
export class EvaluatedReposComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
