import { CreateProject, CreateProjectResponse, Project } from '../models/project.model';
import { computed, inject, Injectable, signal } from '@angular/core';
import { RulesService } from '../services/rules.service';
import { Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RulesFacade {
  private rulesService = inject(RulesService);

  private _rules = signal<Project[] | null>(null);
  readonly rules = computed(() => this._rules());

  private _rulesGroups = signal<Project[] | null>(null);
  readonly rulesGroups = computed(() => this._rulesGroups());

  createRulesGroup(data: any): Observable<any> {
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
