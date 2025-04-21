import { Component, inject, OnInit, Signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { RulesFacade } from '../../../../shared/facades/rules.facade';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateRulesGroupBody, GroupedRules, Rule, RulesGroup } from '../../../../shared/models/rule.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateRulesConfirmationComponent } from '../../components/create-rules-confirmation/create-rules-confirmation.component';
import { JsonPipe, KeyValuePipe, NgClass } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  templateUrl: './create-rules-group.component.html',
  styleUrl: './create-rules-group.component.scss',
  standalone: true,
  imports: [
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    JsonPipe,
    KeyValuePipe,
    MatSliderModule,
    NgClass
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
  rules!: Signal<Rule[] | null>;
  groupedRules!: Signal<GroupedRules | null>;
  selectedRules: string[] = [];
  readonly dialog = inject(MatDialog);
  sliderValue = 0;

  constructor() {}

  ngOnInit(): void {
    this.rulesFacade.loadRules();
    this.rules = this.rulesFacade.rules;
    this.groupedRules = this.rulesFacade.groupedRules;
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

    const body: CreateRulesGroupBody = {
      name: formValue.name!,
      description: formValue.description!,
      rule_ids: formValue.rule_ids!
    };

    this.rulesFacade.createRulesGroup(body)
      .subscribe(rulesGroup => {
        this.openDialog(rulesGroup);
      });
  }

  private openDialog(rulesGroup: RulesGroup): void {
    const dialogRef = this.dialog.open(CreateRulesConfirmationComponent, {
      data: rulesGroup
    });

    dialogRef.afterClosed().subscribe(() => {
      this.createRulesForm.reset();
    });
  }

  onSliderChange(value: number) {
    this.sliderValue = value;
  }
}
