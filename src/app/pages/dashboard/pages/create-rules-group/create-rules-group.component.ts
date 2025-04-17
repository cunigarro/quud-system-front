import { Component, inject, OnInit, Signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { RulesFacade } from '../../../../shared/facades/rules.facade';
import { JsonPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  templateUrl: './create-rules-group.component.html',
  styleUrl: './create-rules-group.component.scss',
  standalone: true,
  imports: [
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
})
export class CreateRulesGroupComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);
  createRulesForm = this._formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    rule_ids: [[]]
  });
  rulesFacade = inject(RulesFacade);
  rules!: Signal<any[] | null>;

  selectedRules: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.rulesFacade.loadRules();
    this.rules = this.rulesFacade.rules;
  }

  toggleSelection(item: string): void {
    const index = this.selectedRules.indexOf(item);
    if (index >= 0) {
      this.selectedRules.splice(index, 1);
    } else {
      this.selectedRules.push(item);
    }
  }

  isSelected(item: string): boolean {
    return this.selectedRules.includes(item);
  }

  createRules(): void {
    if (this.createRulesForm.invalid) {
      this.createRulesForm.markAllAsTouched();
      return;
    }

    const formValue = this.createRulesForm.value;

    this.rulesFacade.createRulesGroup(formValue)
      .subscribe(() => {
        console.log('Rules created.');
      });
  }
}
