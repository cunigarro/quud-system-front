import { Component, OnInit, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ProjectsFacade } from '../../../../shared/facades/projects.facade';
import { Project } from '../../../../shared/models/project.model';
import { Inspection } from '../../../../shared/models/inspection.model';
import { InspectionsFacade } from '../../../../shared/facades/inspections.facade';
import { forkJoin } from 'rxjs';
import { EvaluationsFacade } from '../../../../shared/facades/evaluations.facade';
import { Evaluation } from '../../../../shared/models/evaluation.model';

@Component({
  templateUrl: './evaluated-repos.component.html',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
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
