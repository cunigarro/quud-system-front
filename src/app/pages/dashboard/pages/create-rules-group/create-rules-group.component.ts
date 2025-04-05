import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';

@Component({
  templateUrl: './create-rules-group.component.html',
  styleUrl: './create-rules-group.component.scss',
  standalone: true,
  imports: [
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatButtonModule
  ],
})
export class CreateRulesGroupComponent implements OnInit {
  readonly bestBoys: string[] = [
    'Encapsulation',
    'Lines by Class',
    'Reliability',
    'Inheritance',
    'Maintainability',
    'Efficiency'
  ];

  constructor() {}

  ngOnInit(): void {}
}
