import { Component, OnInit, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { EvaluationsFacade } from '../../../../shared/facades/evaluations.facade';
import { Evaluation } from '../../../../shared/models/evaluation.model';
import { JsonPipe } from '@angular/common';

@Component({
  templateUrl: './evaluated-repos.component.html',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, JsonPipe],
})
export class EvaluatedReposComponent implements OnInit {
  evaluations!: Signal<Evaluation[] | null>;

  constructor(
    private evaluationsFacade: EvaluationsFacade
  ) {}

  ngOnInit(): void {
    this.evaluationsFacade.loadEvaluations();
    this.evaluations = this.evaluationsFacade.evaluations;
  }
}
