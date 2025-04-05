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
  readonly rules: string[] = [
    'Encapsulation',
    'Lines by Class',
    'Reliability',
    'Inheritance',
    'Maintainability',
    'Efficiency'
  ];

  selectedRules: string[] = [];

  constructor() {}

  ngOnInit(): void {}

  toggleSelection(item: string): void {
    const index = this.selectedRules.indexOf(item);
    if (index >= 0) {
      this.selectedRules.splice(index, 1);
    } else {
      this.selectedRules.push(item);
    }

    console.log(this.selectedRules);
  }

  isSelected(item: string): boolean {
    return this.selectedRules.includes(item);
  }
}
