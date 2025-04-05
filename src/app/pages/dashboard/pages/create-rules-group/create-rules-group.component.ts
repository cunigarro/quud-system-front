import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  templateUrl: './create-rules-group.component.html',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
})
export class CreateRulesGroupComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
