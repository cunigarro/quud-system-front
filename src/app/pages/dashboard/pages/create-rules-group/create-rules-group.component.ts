import { Component, computed, inject, OnInit, signal, Signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { RulesFacade } from '../../../../shared/facades/rules.facade';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  GroupedRules,
  Rule,
  RulesGroup,
  RuleWeight,
} from '../../../../shared/models/rule.model';
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
    NgClass,
  ],
})
export class CreateRulesGroupComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);
  createRulesForm = this._formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    rule_ids: [[]],
    alfa: [0],
    attributes_weights: [[]], // ✅ cambio aquí
    paradigm_weights: [[]], // ✅ y aquí también
  });
  rulesFacade = inject(RulesFacade);
  rules!: Signal<Rule[] | null>;
  weightsByRuleType = signal<Record<number, number>>({});
  groupedRules!: Signal<GroupedRules | null>;
  selectedRules: string[] = [];
  readonly dialog = inject(MatDialog);

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
    const weights = this.weightsByRuleType();

    const attributes_weights: RuleWeight[] = [];
    const paradigm_weights: RuleWeight[] = [];

    Object.entries(this.groupedRules() || {}).forEach(([dimension, types]) => {
      Object.values(types).forEach((rules) => {
        const ruleTypeId = rules[0]?.rule_type.id;
        if (ruleTypeId === undefined) return;

        const weight = weights[ruleTypeId] ?? 0;

        const entry: RuleWeight = {
          rule_type_id: ruleTypeId,
          quantity: weight,
        };

        if (dimension === 'attribute') {
          attributes_weights.push(entry);
        } else if (dimension === 'paradigm') {
          paradigm_weights.push(entry);
        }
      });
    });

    this.createRulesForm.patchValue({
      attributes_weights: attributes_weights as any,
      paradigm_weights: paradigm_weights as any,
    });

    const body: any = this.createRulesForm.value;
    this.rulesFacade.createRulesGroup(body).subscribe((group) => {
      this.openDialog(group);
    });
  }

  private openDialog(rulesGroup: RulesGroup): void {
    const dialogRef = this.dialog.open(CreateRulesConfirmationComponent, {
      data: rulesGroup,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.createRulesForm.reset();
    });
  }

  onWeightChange(ruleTypeId: number | undefined, event: any) {
    if (ruleTypeId === undefined) return;
    const current = this.weightsByRuleType();
    this.weightsByRuleType.set({
      ...current,
      [ruleTypeId]: Number(event.target.value),
    });
  }

  sumOfAttributeWeights = computed(() => {
    const weights = this.weightsByRuleType();
    const grouped = this.groupedRules();

    if (!grouped) return 0;

    let sum = 0;

    Object.entries(grouped).forEach(([dimension, types]) => {
      if (dimension !== 'attribute') return;
      Object.values(types).forEach(rules => {
        const ruleTypeId = rules[0]?.rule_type.id;
        if (ruleTypeId !== undefined) {
          sum += weights[ruleTypeId] ?? 0;
        }
      });
    });

    return parseFloat(sum.toFixed(4));
  });

  sumOfParadigmWeights = computed(() => {
    const weights = this.weightsByRuleType();
    const grouped = this.groupedRules();

    if (!grouped) return 0;

    let sum = 0;

    Object.entries(grouped).forEach(([dimension, types]) => {
      if (dimension !== 'paradigm') return;
      Object.values(types).forEach(rules => {
        const ruleTypeId = rules[0]?.rule_type.id;
        if (ruleTypeId !== undefined) {
          sum += weights[ruleTypeId] ?? 0;
        }
      });
    });

    return parseFloat(sum.toFixed(4));
  });
}
