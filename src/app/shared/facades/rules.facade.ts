import { computed, inject, Injectable, signal } from '@angular/core';
import { RulesService } from '../services/rules.service';
import { Observable } from 'rxjs';
import { CreateRulesGroupBody, Rule, RulesGroup } from '../models/rule.model';

@Injectable({ providedIn: 'root' })
export class RulesFacade {
  private rulesService = inject(RulesService);

  private _rules = signal<Rule[] | null>(null);
  readonly rules = computed(() => this._rules());

  private _rulesGroups = signal<RulesGroup[] | null>(null);
  readonly rulesGroups = computed(() => this._rulesGroups());

  createRulesGroup(data: CreateRulesGroupBody): Observable<RulesGroup> {
    return this.rulesService.createRulesGroup(data);
  }

  loadRules() {
    if (!this._rules()) {
      this.rulesService.rules().subscribe({
        next: (rules) => {
          this._rules.set(rules)
        },
        error: (err) => console.error('Error loading rules', err),
      });
    }
  }

  loadRulesGroups() {
    if(!this._rulesGroups()) {
      this.rulesService.rulesGroups().subscribe({
        next: (rulesGroups) => {
          this._rulesGroups.set(rulesGroups)
        },
        error: (err) => console.error('Error loading rules groups', err),
      })
    }
  }
}
