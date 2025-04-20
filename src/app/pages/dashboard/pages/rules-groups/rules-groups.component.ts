import { Component, inject, OnInit, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RulesFacade } from '../../../../shared/facades/rules.facade';
import { JsonPipe } from '@angular/common';
import { RulesGroup } from '../../../../shared/models/rule.model';
import { RouterModule } from '@angular/router';

@Component({
  templateUrl: './rules-groups.component.html',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, JsonPipe, RouterModule],
})
export class RulesGroupsComponent implements OnInit {
  rulesFacade = inject(RulesFacade);
  rulesGroups!: Signal<RulesGroup[] | null>;

  constructor() {}

  ngOnInit(): void {
    this.rulesFacade.loadRulesGroups();
    this.rulesGroups = this.rulesFacade.rulesGroups;
  }
}
