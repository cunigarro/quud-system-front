import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  templateUrl: './rules-groups.component.html',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
})
export class RulesGroupsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
